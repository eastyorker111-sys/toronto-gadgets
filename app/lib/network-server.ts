import {randomUUID} from 'node:crypto';
import {database} from './supplier-server';
import {validateRows} from './network-csv.mjs';
type Account=Record<string,any>;
export const hubEnabled=()=>process.env.NETWORK_HUB_ENABLED==='true';
export function approvedMember(a:Account){return a.status==='Approved'&&a.network_status==='Approved'&&JSON.parse(a.profile).networkOptIn===true;}
export async function networkDashboard(a:Account){
 if(!hubEnabled())return {hubEnabled:false,networkItems:[],myPosts:[],myOffers:[],notifications:[]};
 if(!approvedMember(a))return {hubEnabled:true,networkItems:[],myPosts:[],myOffers:[],notifications:[]};
 const today=new Date().toISOString().slice(0,10);
 const data=await database([
 {sql:"SELECT i.id,i.post_id,i.item_ref,i.product,i.specifications,i.quantity,i.condition,i.city,i.country,i.needed_by,i.partial_allowed,p.title,p.created_at,(p.account_id=?) AS own FROM network_items i JOIN network_posts p ON p.id=i.post_id JOIN supplier_accounts a ON a.id=p.account_id WHERE p.status='Open' AND i.needed_by>=? AND a.status='Approved' AND a.network_status='Approved' AND json_extract(a.profile,'$.networkOptIn')=1 ORDER BY p.created_at DESC LIMIT 500",params:[a.id,today]},
 {sql:"SELECT p.id,p.title,p.status,p.created_at,i.id AS item_id,i.item_ref,i.product,i.quantity,i.needed_by,i.specifications,i.condition,i.city,i.country,i.partial_allowed,p.revision,COALESCE((SELECT SUM(o.quantity) FROM network_offers o JOIN supplier_accounts s ON s.id=o.account_id WHERE o.item_id=i.id AND o.status<>'Declined' AND o.synced_revision>=o.revision AND s.status='Approved' AND s.network_status='Approved' AND json_extract(s.profile,'$.networkOptIn')=1),0) AS offered FROM network_posts p JOIN network_items i ON i.post_id=p.id WHERE p.account_id=? ORDER BY p.created_at DESC LIMIT 500",params:[a.id]},
 {sql:'SELECT o.*,i.product,i.item_ref FROM network_offers o JOIN network_items i ON i.id=o.item_id WHERE o.account_id=? ORDER BY o.created_at DESC LIMIT 500',params:[a.id]},
 {sql:'SELECT id,post_id,kind,message,created_at,read_at FROM network_notifications WHERE account_id=? ORDER BY created_at DESC LIMIT 100',params:[a.id]}
 ]);return {hubEnabled:true,networkItems:data[0].results,myPosts:data[1].results,myOffers:data[2].results,notifications:data[3].results};
}
export async function networkAction(action:string,b:Account,a:Account){
 if(!hubEnabled())throw Error('The posting hub is not open yet.');if(!approvedMember(a))throw Error('Approved network membership is required.');
 const now=new Date().toISOString();
 if(action==='network-read'){await database([{sql:'UPDATE network_notifications SET read_at=? WHERE id=? AND account_id=?',params:[now,String(b.id),a.id]}]);return {message:'Update marked as read.'};}
 if(action==='network-close'){const r=await database([{sql:"UPDATE network_posts SET status='Closed',revision=revision+1 WHERE id=? AND account_id=? AND status='Open'",params:[String(b.id),a.id]}]);if(!r[0].meta.changes)throw Error('This open post does not belong to your account.');return {message:'Requirement closed. No more offers can be submitted.'};}
 if(action==='network-edit'){
 const rows=validateRows('requirements',b.rows);
 const post=(await database([{sql:'SELECT id,revision,status FROM network_posts WHERE id=? AND account_id=?',params:[String(b.id),a.id]}]))[0].results[0];
 if(!post||post.status!=='Open'||post.revision!==b.revision)throw Error('This requirement changed or is closed. Refresh before editing.');
 const existing=(await database([{sql:'SELECT item_ref FROM network_items WHERE post_id=?',params:[post.id]}]))[0].results;
 if(rows.length!==existing.length||rows.some(r=>!existing.some(i=>i.item_ref===r.item_ref)))throw Error('Keep the existing item references when editing. Create a new requirement for additional items.');
 const guard="EXISTS (SELECT 1 FROM network_posts p WHERE p.id=network_items.post_id AND p.account_id=? AND p.revision=? AND p.status='Open') AND NOT EXISTS (SELECT 1 FROM network_offers o WHERE o.post_id=network_items.post_id)";
 const result=await database([
 {sql:"UPDATE network_items SET product=json_extract(j.value,'$.product'),specifications=json_extract(j.value,'$.specifications'),quantity=json_extract(j.value,'$.quantity'),condition=json_extract(j.value,'$.condition'),city=json_extract(j.value,'$.city'),country=json_extract(j.value,'$.country'),needed_by=json_extract(j.value,'$.needed_by'),partial_allowed=json_extract(j.value,'$.partial_allowed') FROM json_each(?) AS j WHERE network_items.post_id=? AND network_items.item_ref=json_extract(j.value,'$.item_ref') AND "+guard,params:[JSON.stringify(rows),post.id,a.id,b.revision]},
 {sql:"UPDATE network_posts SET title=?,revision=revision+1 WHERE id=? AND account_id=? AND revision=? AND status='Open' AND NOT EXISTS (SELECT 1 FROM network_offers WHERE post_id=network_posts.id)",params:[rows[0].product+(rows.length>1?` and ${rows.length-1} more items`:''),post.id,a.id,b.revision]}
 ]);
 if(result[result.length-1].meta.changes!==1)throw Error('Responses have arrived or this requirement changed. Close it and post a replacement instead.');
 return {message:'Requirement updated. The next sync updates the TG CRM.'};
 }
 if(action==='network-post'){
 const rows=validateRows('requirements',b.rows);if(typeof b.submissionKey!=='string'||!/^[a-f0-9-]{36}$/.test(b.submissionKey))throw Error('Refresh the form before submitting.');
 const prior=(await database([{sql:'SELECT id FROM network_posts WHERE account_id=? AND submission_key=?',params:[a.id,b.submissionKey]}]))[0].results[0];if(prior)return {message:`Requirement ${prior.id} was already saved.`};
 const id='TG-NEED-'+randomUUID();
 await database([
 {sql:'INSERT INTO network_posts (id,account_id,title,created_at,submission_key) VALUES (?,?,?,?,?)',params:[id,a.id,rows[0].product+(rows.length>1?` and ${rows.length-1} more items`:''),now,b.submissionKey]},
 {sql:"INSERT INTO network_items (id,post_id,item_ref,product,specifications,quantity,condition,city,country,needed_by,partial_allowed) SELECT json_extract(value,'$.id'),?,json_extract(value,'$.item_ref'),json_extract(value,'$.product'),json_extract(value,'$.specifications'),json_extract(value,'$.quantity'),json_extract(value,'$.condition'),json_extract(value,'$.city'),json_extract(value,'$.country'),json_extract(value,'$.needed_by'),json_extract(value,'$.partial_allowed') FROM json_each(?)",params:[id,JSON.stringify(rows.map(r=>({...r,id:'TG-ITEM-'+randomUUID()})))]},
 {sql:"INSERT INTO network_notifications (id,account_id,post_id,kind,message,created_at) SELECT ?||':'||id,id,?,'Requirement',?,? FROM supplier_accounts WHERE id<>? AND status='Approved' AND network_status='Approved' AND json_extract(profile,'$.networkOptIn')=1",params:[randomUUID(),id,'New urgent requirement: '+rows[0].product,now,a.id]}
 ]);return {message:`Requirement ${id} posted. A dashboard update is available to approved network members.`};
 }
 if(action==='network-offer'){
 const rows=validateRows('offers',b.rows);const ids=[...new Set(rows.map(r=>r.requirement_id))];
 const items=(await database([{sql:"SELECT i.*,p.account_id,p.status,a.status AS supplier_status,a.network_status,json_extract(a.profile,'$.networkOptIn') AS opted FROM network_items i JOIN network_posts p ON p.id=i.post_id JOIN supplier_accounts a ON a.id=p.account_id WHERE p.id IN (SELECT value FROM json_each(?))",params:[JSON.stringify(ids)]}]))[0].results;
 const mapped=rows.map(r=>{const i=items.find(i=>i.post_id===r.requirement_id&&i.item_ref===r.item_ref);if(!i||i.account_id===a.id||i.status!=='Open'||i.needed_by<now.slice(0,10)||i.supplier_status!=='Approved'||i.network_status!=='Approved'||!i.opted)throw Error(`Item ${r.item_ref}: requirement is no longer open to this account.`);if(r.quantity>i.quantity||(i.partial_allowed==='No'&&r.quantity!==i.quantity))throw Error(`Item ${r.item_ref}: quantity must fit the requirement and its partial-quantity rule.`);return {...r,id:'TG-OFFER-'+randomUUID(),item_id:i.id};});
 await database([{sql:"INSERT INTO network_offers (id,post_id,item_id,account_id,quantity,unit_price,currency,condition,lead_days,product_details,terms,created_at) SELECT json_extract(value,'$.id'),json_extract(value,'$.requirement_id'),json_extract(value,'$.item_id'),?,json_extract(value,'$.quantity'),json_extract(value,'$.unit_price'),json_extract(value,'$.currency'),json_extract(value,'$.condition'),json_extract(value,'$.lead_days'),json_extract(value,'$.product_details'),json_extract(value,'$.terms'),? FROM json_each(?) WHERE 1 ON CONFLICT(item_id,account_id) DO UPDATE SET quantity=excluded.quantity,unit_price=excluded.unit_price,currency=excluded.currency,condition=excluded.condition,lead_days=excluded.lead_days,product_details=excluded.product_details,terms=excluded.terms,created_at=excluded.created_at,status='Submitted',revision=network_offers.revision+1",params:[a.id,now,JSON.stringify(mapped)]}]);
 return {message:'Your response is saved privately for TG. After CRM capture, the requester receives a dashboard update. Re-submitting an item updates your existing offer.'};
 }
 throw Error('Unknown networking action.');
}
