import {database} from './supplier-server';
import {approvedMember} from './network-server';
export async function marketplace(account:Record<string,any>,options:Record<string,string>={}){
 const page=(v:string)=>Math.max(1,Math.min(50000,Math.floor(Number(v)||1))),stockPage=page(options.stockPage),needPage=page(options.needPage),size=20;
 if(!approvedMember(account))throw Error('Approved membership required.');
 const terms=(options.q||'').trim().toLowerCase().slice(0,120).split(/\s+/).filter(Boolean).slice(0,8);
 const search=(fields:string[])=>terms.length?' AND '+terms.map(()=>`instr(lower(${fields.join("||' '||")}),?)>0`).join(' AND '):'';
 const stockFrom=" FROM supplier_stock s JOIN supplier_uploads u ON u.id=s.upload_id JOIN supplier_accounts a ON a.id=u.account_id WHERE u.status='Approved' AND u.share_with_members=1 AND u.created_at>? AND a.status='Approved' AND a.network_status='Approved' AND json_extract(a.profile,'$.networkOptIn')=1 AND s.quantity>0"+search(['s.product','s.condition','s.city','s.country']);
 const needFrom=" FROM network_items i JOIN network_posts p ON p.id=i.post_id JOIN supplier_accounts a ON a.id=p.account_id WHERE p.status='Open' AND i.needed_by>=? AND a.status='Approved' AND a.network_status='Approved' AND json_extract(a.profile,'$.networkOptIn')=1"+search(['i.product','i.specifications','i.condition','i.city','i.country'])+(options.post?' AND p.id=?':'');
 const stockArgs=[new Date(Date.now()-30*86400000).toISOString(),...terms],needArgs=[new Date().toISOString().slice(0,10),...terms,...(options.post?[options.post.slice(0,100)]:[])];
 const rows=await database([
 {sql:'SELECT COUNT(*) AS total'+stockFrom,params:stockArgs},
 {sql:'SELECT s.id,s.product,s.quantity,s.minimum_quantity,s.condition,s.city,s.country,(a.id=?) AS own'+stockFrom+' ORDER BY u.created_at DESC,s.id LIMIT ? OFFSET ?',params:[account.id,...stockArgs,size,(stockPage-1)*size]},
 {sql:'SELECT COUNT(*) AS total'+needFrom,params:needArgs},
 {sql:'SELECT i.id,i.post_id,i.item_ref,i.product,i.specifications,i.quantity,i.condition,i.city,i.country,i.needed_by,i.partial_allowed,(p.account_id=?) AS own'+needFrom+' ORDER BY i.needed_by ASC,p.created_at DESC,i.id LIMIT ? OFFSET ?',params:[account.id,...needArgs,options.post?500:size,options.post?0:(needPage-1)*size]}
 ]);
 return {listings:rows[1].results,networkItems:rows[3].results,stockTotal:Number(rows[0].results[0].total),needTotal:Number(rows[2].results[0].total),stockPage,needPage,pageSize:size};
}
