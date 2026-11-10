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
      const r=await env.DB.prepare("UPDATE supplier_uploads SET reminder_state='Sending' WHERE id=? AND reminder_state='Pending' AND status='Approved' AND share_with_members=1 AND created_at<=? AND account_id IN (SELECT id FROM supplier_accounts WHERE status='Approved' AND network_status='Approved' AND json_extract(profile,'$.networkOptIn')=1 AND COALESCE(json_extract(profile,'$.reminderOptIn'),1)=1)").bind(body.id,new Date(Date.now()-30*86400000).toISOString()).run();return json({claimed:r.meta.changes===1});
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
      const row=await env.DB.prepare('SELECT profile,revision,status,network_status FROM supplier_accounts WHERE id=?').bind(body.id).first();
      if(!row||row.revision!==body.revision) return json({error:'Profile changed. Sync and review again.'},409);
      const p=JSON.parse(row.profile);
      if(body.status==='Approved'&&(typeof body.evidenceChecked!=='string'||body.evidenceChecked.length<10||!p.b2bConfirmed)) return json({error:'Record independently checked B2B evidence before approval.'},400);
      if(body.networkStatus==='Approved'&&(!p.networkOptIn||body.status!=='Approved')) return json({error:'Network approval requires supplier approval and network consent.'},400);
      const now=new Date().toISOString();
      const reviewResult=await env.DB.batch([
        env.DB.prepare('UPDATE supplier_accounts SET status=?,network_status=?,review_note=?,reviewed_by=?,reviewed_at=?,evidence_checked=?,revision=revision+1,updated_at=? WHERE id=? AND revision=?').bind(body.status,body.networkStatus,body.note,body.reviewer.slice(0,100),now,String(body.evidenceChecked||'').slice(0,1500),now,body.id,body.revision),
        env.DB.prepare('INSERT INTO supplier_events VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),body.id,'Owner review',now,JSON.stringify({status:body.status,networkStatus:body.networkStatus,reviewer:body.reviewer}))
      ]);
      if(reviewResult[0].meta.changes!==1) return json({error:'Profile changed. Sync and review again.'},409);
      return json({ok:true});
    }
    return json({error:'Not found'},404);
  } catch {return json({error:'Supplier service unavailable'},503);} } };
