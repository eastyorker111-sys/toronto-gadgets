import {randomUUID} from 'node:crypto';
import {database} from './supplier-server';
import {parseInventory} from './supplier-csv.mjs';
import {networkDashboard,hubEnabled,approvedMember} from './network-server';
const fresh=()=>new Date(Date.now()-30*24*60*60*1000).toISOString();
export async function dashboard(account:Record<string,any>) {
  const uploads=(await database([{sql:'SELECT id,created_at,status,drive_file_id,share_with_members,review_note FROM supplier_uploads WHERE account_id=? ORDER BY created_at DESC LIMIT 10',params:[account.id]}]))[0].results;
  const member=account.status==='Approved'&&account.network_status==='Approved'&&JSON.parse(account.profile).networkOptIn;
  const listings=member?(await database([{sql:"SELECT s.id,s.product,s.quantity,s.minimum_quantity,s.condition,s.city,s.country,u.created_at AS updatedAt,(a.id=?) AS own FROM supplier_stock s JOIN supplier_uploads u ON u.id=s.upload_id JOIN supplier_accounts a ON a.id=u.account_id WHERE u.status='Approved' AND u.share_with_members=1 AND u.created_at>? AND a.status='Approved' AND a.network_status='Approved' AND json_extract(a.profile,'$.networkOptIn')=1 AND s.quantity>0 ORDER BY u.created_at DESC LIMIT 500",params:[account.id,fresh()]}]))[0].results:[];
  const requests=(await database([{sql:'SELECT id,stock_id,quantity,created_at FROM supplier_market_requests WHERE account_id=? ORDER BY created_at DESC LIMIT 20',params:[account.id]}]))[0].results;
  const myStock=(await database([{sql:"SELECT s.id,s.sku,s.product,s.quantity,s.minimum_quantity,s.condition,s.city,s.country,s.unit_cost,s.currency FROM supplier_stock s JOIN supplier_uploads u ON u.id=s.upload_id WHERE u.account_id=? AND u.status IN ('Approved','Pending review') ORDER BY s.sku",params:[account.id]}]))[0].results;
  return {uploads,listings,requests,member,myStock,...await networkDashboard(account)};
}
export async function marketAction(action:string,body:Record<string,any>,account:Record<string,any>) {
  if(action==='upload') {
    const rows=parseInventory(body.csv),id=`TG-UP-${randomUUID()}`,now=new Date().toISOString();
    if(typeof body.expectedUploadId!=='string'||body.expectedUploadId.length>100)throw Error('Refresh your inventory before uploading.');
    const current=(await database([{sql:"SELECT id FROM supplier_uploads WHERE account_id=? ORDER BY created_at DESC,id DESC LIMIT 1",params:[account.id]}]))[0].results[0]?.id||'';
    if(current!==body.expectedUploadId)throw Error('Your inventory changed in another window. Refresh and review the latest stock before replacing it.');
    // A single atomic batch: no partial inventory or premature replacement on failure.
    const direct=hubEnabled()&&approvedMember(account);
    if(hubEnabled()&&!approvedMember(account))throw Error('Approved network membership is required to post inventory.');
    const statements=[{sql:"INSERT INTO supplier_uploads (id,account_id,csv,created_at,share_with_members,status) SELECT ?,?,?,?,?,? WHERE COALESCE((SELECT id FROM supplier_uploads WHERE account_id=? ORDER BY created_at DESC,id DESC LIMIT 1),'')=?",params:[id,account.id,body.csv,now,body.shareWithMembers===true?1:0,direct?'Approved':'Pending review',account.id,body.expectedUploadId]},
      {sql:"UPDATE supplier_uploads SET status='Replaced',synced=0 WHERE account_id=? AND id<>? AND status IN ('Approved','Pending review')",params:[account.id,id]}];
    // Insert JSON through SQLite's table function to keep the batch and parameter count bounded.
    statements.push({sql:"INSERT INTO supplier_stock (id,upload_id,sku,product,quantity,condition,city,country,unit_cost,currency,minimum_quantity) SELECT json_extract(value,'$.id'),?,json_extract(value,'$.sku'),json_extract(value,'$.product'),json_extract(value,'$.quantity'),json_extract(value,'$.condition'),json_extract(value,'$.city'),json_extract(value,'$.country'),json_extract(value,'$.unitCost'),json_extract(value,'$.currency'),json_extract(value,'$.minimumQuantity') FROM json_each(?)",params:[id,JSON.stringify(rows.map(r=>({...r,id:`TG-ST-${randomUUID()}`})))]});
    try{await database(statements);}catch{throw Error('Inventory could not be replaced. Refresh and check for newer changes before trying again.');}
    return {message:`Saved ${rows.length} products${direct?'':' for review'}. This file replaces your previous stock list. Google Drive filing is pending.`,...await dashboard(account)};
  }
  if(action==='request') {
    if(account.status!=='Approved'||account.network_status!=='Approved'||!JSON.parse(account.profile).networkOptIn)throw new Error('Network approval is required.');
    if(!Number.isInteger(body.quantity)||body.quantity<1||body.quantity>1000000||typeof body.notes!=='string'||body.notes.length>1500)throw new Error('Enter a valid quantity and a note of up to 1,500 characters.');
    const id=`TG-RFQ-${randomUUID()}`;
    const r=await database([{sql:"INSERT INTO supplier_market_requests (id,account_id,stock_id,quantity,notes,created_at) SELECT ?,?,s.id,?,?,? FROM supplier_stock s JOIN supplier_uploads u ON u.id=s.upload_id JOIN supplier_accounts a ON a.id=u.account_id WHERE s.id=? AND s.quantity>=? AND s.minimum_quantity<=? AND u.status='Approved' AND u.share_with_members=1 AND u.created_at>? AND a.status='Approved' AND a.network_status='Approved' AND json_extract(a.profile,'$.networkOptIn')=1 AND a.id<>?",params:[id,account.id,body.quantity,body.notes.trim(),new Date().toISOString(),body.stockId,body.quantity,body.quantity,fresh(),account.id]}]);
    if(r[0].meta.changes!==1)throw new Error('This listing is no longer available at that quantity. Refresh and try again.');
    return {message:`Request ${id} saved for Toronto Gadgets. Stock and price require confirmation; this is not an order.`,...await dashboard(account)};
  }
  throw new Error('Unknown action.');
}
