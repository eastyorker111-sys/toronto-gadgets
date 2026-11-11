const json = (body,status=200) => Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function equals(a,b) {
  if (!a || !b) return false;
  const enc = new TextEncoder();
  const [x,y] = await Promise.all([a,b].map(v=>crypto.subtle.digest('SHA-256',enc.encode(v))));
  const xa=new Uint8Array(x), ya=new Uint8Array(y); let d=0;
  for(let i=0;i<xa.length;i++) d|=xa[i]^ya[i];
  return d===0;
}
export default { async fetch(request,env) {
  try {
    const path=new URL(request.url).pathname;
    const key=request.headers.get('authorization')?.replace(/^Bearer /,'');
    const crm=path.startsWith('/crm/');
    if(!await equals(key,crm?env.CRM_KEY:env.API_KEY)) return json({error:'Unauthorized'},401);
    if(request.method!=='POST') return json({error:'Method not allowed'},405);
    const raw=await request.text(); if(raw.length>1000000) return json({error:'Too large'},413);
    const body=JSON.parse(raw);
    if(path==='/crm/mail-health') {
      // A crashed sender is held for review, never silently resent: delivery may
      // already have happened before the acknowledgement was lost.
      const cutoff=new Date(Date.now()-30*60*1000).toISOString();
      await env.DB.batch([
        env.DB.prepare("UPDATE supplier_activation_mail SET state='Needs manual review' WHERE state='Sending' AND COALESCE(claimed_at,created_at)<?").bind(cutoff),
        env.DB.prepare("UPDATE network_email_jobs SET state='Needs manual review' WHERE state='Sending' AND COALESCE(claimed_at,created_at)<?").bind(cutoff),
        env.DB.prepare("UPDATE supplier_uploads SET reminder_state='Needs manual review' WHERE reminder_state='Sending' AND COALESCE(reminder_claimed_at,created_at)<?").bind(cutoff)
      ]);
      const jobs=await env.DB.prepare("SELECT 'Activation' AS kind,id,state,created_at,claimed_at FROM supplier_activation_mail WHERE state<>'Sent' UNION ALL SELECT 'Network update',id,state,created_at,claimed_at FROM network_email_jobs WHERE state<>'Sent' UNION ALL SELECT 'Inventory reminder',id,reminder_state,created_at,reminder_claimed_at FROM supplier_uploads WHERE reminder_state IN ('Sending','Needs manual review') ORDER BY created_at LIMIT 500").all();
      return json({jobs:jobs.results});
    }
    if(path==='/query') {
      if(!Array.isArray(body.statements)||body.statements.length>20) return json({error:'Invalid batch'},400);
      const results=await env.DB.batch(body.statements.map(s=>env.DB.prepare(s.sql).bind(...(s.params||[]))));
      return json({results});
    }
    if(path==='/crm/export') {
      const rows=await env.DB.prepare('SELECT id,email,profile,status,network_status,revision,created_at,updated_at,review_note FROM supplier_accounts WHERE revision > synced_revision ORDER BY updated_at LIMIT 100').all();
      const uploads=await env.DB.prepare('SELECT u.*,a.email FROM supplier_uploads u JOIN supplier_accounts a ON a.id=u.account_id WHERE u.synced=0 ORDER BY u.created_at LIMIT 10').all();
      const requests=await env.DB.prepare('SELECT r.*,a.email AS buyer_email,s.product,s.sku,s.unit_cost,s.currency,u.account_id AS supplier_id FROM supplier_market_requests r JOIN supplier_accounts a ON a.id=r.account_id JOIN supplier_stock s ON s.id=r.stock_id JOIN supplier_uploads u ON u.id=s.upload_id WHERE r.synced=0 ORDER BY r.created_at LIMIT 100').all();
      return json({applications:rows.results.map(r=>({...r,profile:JSON.parse(r.profile)})),uploads:uploads.results,requests:requests.results});
    }
    if(path==='/crm/activation-emails') {
      const r=await env.DB.prepare("SELECT m.id,a.email FROM supplier_activation_mail m JOIN supplier_accounts a ON a.id=m.account_id WHERE m.state='Pending' AND a.status='Approved' AND a.network_status='Approved' AND json_extract(a.profile,'$.networkOptIn')=1 ORDER BY m.created_at LIMIT 50").all();return json({emails:r.results});
    }
    if(path==='/crm/activation-email-claim') {
      const r=await env.DB.prepare("UPDATE supplier_activation_mail SET state='Sending',claimed_at=? WHERE id=? AND state='Pending' AND account_id IN (SELECT id FROM supplier_accounts WHERE status='Approved' AND network_status='Approved' AND json_extract(profile,'$.networkOptIn')=1)").bind(new Date().toISOString(),body.id).run();
      if(r.meta.changes!==1)return json({claimed:false});
      const token=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
      const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token))),b=>b.toString(16).padStart(2,'0')).join('');
      const verified=await env.DB.prepare("UPDATE supplier_email_verifications SET token_hash=?,expires_at=? WHERE account_id=(SELECT account_id FROM supplier_activation_mail WHERE id=?) AND verified_at=''").bind(hash,Date.now()+72*60*60*1000,body.id).run();
      return json({claimed:true,...(verified.meta.changes===1?{verificationToken:token}:{})});
    }
    if(path==='/crm/activation-email-result') {
      if(!['Sent','Needs manual review'].includes(body.state))return json({error:'Invalid result'},400);
      await env.DB.prepare("UPDATE supplier_activation_mail SET state=? WHERE id=? AND state='Sending'").bind(body.state,body.id).run();return json({ok:true});
    }
    if(path==='/crm/network-emails') {
      const r=await env.DB.prepare("SELECT j.id,a.email,n.post_id,n.kind,n.message FROM network_email_jobs j JOIN supplier_accounts a ON a.id=j.account_id JOIN network_notifications n ON n.id=j.notice_id WHERE j.state='Pending' AND a.status='Approved' AND a.network_status='Approved' AND json_extract(a.profile,'$.networkOptIn')=1 AND json_extract(a.profile,'$.networkAlertsOptIn')=1 ORDER BY j.created_at LIMIT 50").all();return json({emails:r.results});
    }
    if(path==='/crm/network-email-claim') {
      const r=await env.DB.prepare("UPDATE network_email_jobs SET state='Sending',claimed_at=? WHERE id=? AND state='Pending' AND account_id IN (SELECT id FROM supplier_accounts WHERE status='Approved' AND network_status='Approved' AND json_extract(profile,'$.networkOptIn')=1 AND json_extract(profile,'$.networkAlertsOptIn')=1)").bind(new Date().toISOString(),body.id).run();return json({claimed:r.meta.changes===1});
    }
    if(path==='/crm/network-email-result') {
      if(!['Sent','Needs manual review'].includes(body.state))return json({error:'Invalid result'},400);
      await env.DB.prepare("UPDATE network_email_jobs SET state=? WHERE id=? AND state='Sending'").bind(body.state,body.id).run();return json({ok:true});
    }
    if(path==='/crm/network-export') {
      const posts=await env.DB.prepare('SELECT p.*,a.email,a.profile FROM network_posts p JOIN supplier_accounts a ON a.id=p.account_id WHERE p.revision>p.synced_revision ORDER BY p.created_at LIMIT 100').all();
      const items=posts.results.length?await env.DB.prepare('SELECT * FROM network_items WHERE post_id IN (SELECT value FROM json_each(?))').bind(JSON.stringify(posts.results.map(p=>p.id))).all():{results:[]};
      const offers=await env.DB.prepare('SELECT o.*,a.email,i.item_ref,i.product,p.account_id AS requester_id FROM network_offers o JOIN supplier_accounts a ON a.id=o.account_id JOIN network_items i ON i.id=o.item_id JOIN network_posts p ON p.id=o.post_id WHERE o.revision>o.synced_revision ORDER BY o.created_at LIMIT 100').all();
      return json({posts:posts.results.map(({profile,...p})=>({...p,business_name:JSON.parse(profile).businessName})),items:items.results,offers:offers.results});
    }
    if(path==='/crm/network-offer-review') {
      if(!['Submitted','Under review','Shortlisted','Declined','Availability confirmed'].includes(body.status)||!Number.isInteger(body.revision)||typeof body.reviewer!=='string'||!body.reviewer.trim())return json({error:'Choose a valid offer stage and record the owner/reviewer.'},400);
      const result=await env.DB.prepare('UPDATE network_offers SET status=?,revision=revision+1 WHERE id=? AND revision=?').bind(body.status,body.id,body.revision).run();
      if(result.meta.changes!==1)return json({error:'Offer changed. Sync and review the current revision.'},409);
      return json({ok:true});
    }
    if(path==='/crm/network-ack') {
      if(!['post','offer'].includes(body.kind)||!Number.isInteger(body.revision)||typeof body.id!=='string')return json({error:'Invalid acknowledgement'},400);
      if(body.kind==='post')await env.DB.prepare('UPDATE network_posts SET synced_revision=? WHERE id=? AND revision=?').bind(body.revision,body.id,body.revision).run();
      else await env.DB.batch([
        env.DB.prepare("INSERT OR IGNORE INTO network_notifications (id,account_id,post_id,kind,message,created_at) SELECT 'crm:'||o.id||':'||o.revision,p.account_id,p.id,'Response',CASE WHEN o.status='Submitted' THEN 'A response for '||i.product||' is recorded with TG. Open My posts for quantities.' ELSE 'TG review for '||i.product||': '||o.status||'. Open My posts for quantities.' END,? FROM network_offers o JOIN network_posts p ON p.id=o.post_id JOIN network_items i ON i.id=o.item_id WHERE o.id=? AND o.revision=? AND o.synced_revision<o.revision").bind(new Date().toISOString(),body.id,body.revision),
        env.DB.prepare('UPDATE network_offers SET synced_revision=? WHERE id=? AND revision=?').bind(body.revision,body.id,body.revision)
      ]);
      return json({ok:true});
    }
    if(path==='/crm/ack') {
      if(!Array.isArray(body.items)||body.items.length>100) return json({error:'Invalid batch'},400);
      if(body.items.length) await env.DB.batch(body.items.map(x=>env.DB.prepare('UPDATE supplier_accounts SET synced_revision=? WHERE id=? AND revision=?').bind(x.revision,x.id,x.revision)));
      return json({ok:true});
    }
    if(path==='/crm/filed') {
      if(typeof body.id!=='string'||typeof body.driveFileId!=='string'||!body.driveFileId) return json({error:'Invalid file'},400);
      await env.DB.prepare('UPDATE supplier_uploads SET drive_file_id=?,synced=1 WHERE id=? AND status=?').bind(body.driveFileId,body.id,body.status).run();
      return json({ok:true});
    }
    if(path==='/crm/request-ack') {
      await env.DB.prepare('UPDATE supplier_market_requests SET synced=1 WHERE id=?').bind(body.id).run();return json({ok:true});
    }
    if(path==='/crm/reminders') {
      const r=await env.DB.prepare("SELECT u.id,u.account_id,u.created_at,a.email FROM supplier_uploads u JOIN supplier_accounts a ON a.id=u.account_id WHERE u.created_at<=? AND u.status='Approved' AND u.share_with_members=1 AND u.reminder_state='Pending' AND a.status='Approved' AND a.network_status='Approved' AND json_extract(a.profile,'$.networkOptIn')=1 AND COALESCE(json_extract(a.profile,'$.reminderOptIn'),1)=1 ORDER BY u.created_at LIMIT 50").bind(new Date(Date.now()-30*86400000).toISOString()).all();return json({reminders:r.results});
    }
    if(path==='/crm/reminder-claim') {
      const r=await env.DB.prepare("UPDATE supplier_uploads SET reminder_state='Sending',reminder_claimed_at=? WHERE id=? AND reminder_state='Pending' AND status='Approved' AND share_with_members=1 AND created_at<=? AND account_id IN (SELECT id FROM supplier_accounts WHERE status='Approved' AND network_status='Approved' AND json_extract(profile,'$.networkOptIn')=1 AND COALESCE(json_extract(profile,'$.reminderOptIn'),1)=1)").bind(new Date().toISOString(),body.id,new Date(Date.now()-30*86400000).toISOString()).run();return json({claimed:r.meta.changes===1});
    }
    if(path==='/crm/reminder-result') {
      if(!['Sent','Needs manual review'].includes(body.state)) return json({error:'Invalid result'},400);
      await env.DB.prepare("UPDATE supplier_uploads SET reminder_state=? WHERE id=? AND reminder_state='Sending'").bind(body.state,body.id).run();return json({ok:true});
    }
    if(path==='/crm/inventory-review') {
      if(!['Approved','Declined'].includes(body.status)||typeof body.note!=='string'||body.note.length>1000||!body.reviewer||body.identityChecked!==true) return json({error:'Check the file for identity/contact details and record a reviewer.'},400);
      const result=await env.DB.prepare("UPDATE supplier_uploads SET status=?,review_note=?,synced=0 WHERE id=? AND status='Pending review' AND created_at>? AND account_id IN (SELECT id FROM supplier_accounts WHERE status='Approved' AND network_status='Approved' AND json_extract(profile,'$.networkOptIn')=1)").bind(body.status,body.note,body.id,new Date(Date.now()-30*86400000).toISOString()).run();
      if(result.meta.changes!==1)return json({error:'Approve the supplier and networking request first; the upload must be current and pending.'},409);
      return json({ok:true});
    }
    if(path==='/crm/review') {
      const status=['Pending review','Needs clarification','Approved','Declined','Suspended'];
      const network=['Not requested','Requested','Approved','Declined','Withdrawn'];
      if(!status.includes(body.status)||!network.includes(body.networkStatus)||typeof body.reviewer!=='string'||!body.reviewer.trim()||typeof body.note!=='string'||body.note.length>1000) return json({error:'Invalid review'},400);
      const row=await env.DB.prepare('SELECT profile,revision,synced_revision,status,network_status FROM supplier_accounts WHERE id=?').bind(body.id).first();
      if(!row||row.revision!==body.revision) return json({error:'Profile changed. Sync and review again.'},409);
      if(body.status==='Approved'&&row.synced_revision<row.revision)return json({error:'Capture this application in the CRM before approving and activating access.'},409);
      const p=JSON.parse(row.profile);
      if(body.status==='Approved'&&(typeof body.evidenceChecked!=='string'||body.evidenceChecked.length<10||!p.b2bConfirmed)) return json({error:'Record independently checked B2B evidence before approval.'},400);
      if(body.networkStatus==='Approved'&&(!p.networkOptIn||body.status!=='Approved')) return json({error:'Network approval requires supplier approval and network consent.'},400);
      const now=new Date().toISOString();
      const reviewResult=await env.DB.batch([
        env.DB.prepare('UPDATE supplier_accounts SET status=?,network_status=?,review_note=?,reviewed_by=?,reviewed_at=?,evidence_checked=?,revision=revision+1,updated_at=? WHERE id=? AND revision=?').bind(body.status,body.networkStatus,body.note,body.reviewer.slice(0,100),now,String(body.evidenceChecked||'').slice(0,1500),now,body.id,body.revision),
        env.DB.prepare('INSERT INTO supplier_events VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),body.id,'Owner review',now,JSON.stringify({status:body.status,networkStatus:body.networkStatus,reviewer:body.reviewer})),
        ...(body.status==='Approved'&&body.networkStatus==='Approved'&&(row.status!=='Approved'||row.network_status!=='Approved')?[env.DB.prepare("INSERT OR IGNORE INTO supplier_activation_mail (id,account_id,revision,created_at) SELECT ?,id,revision,? FROM supplier_accounts WHERE id=? AND revision=? AND status='Approved' AND network_status='Approved'").bind(body.id+':active:'+(body.revision+1),now,body.id,body.revision+1)]:[])
      ]);
      if(reviewResult[0].meta.changes!==1) return json({error:'Profile changed. Sync and review again.'},409);
      return json({ok:true,activated:body.status==='Approved'&&body.networkStatus==='Approved'});
    }
    return json({error:'Not found'},404);
  } catch {return json({error:'Supplier service unavailable'},503);} } };
