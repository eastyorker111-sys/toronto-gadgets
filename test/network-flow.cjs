// Entirely isolated: in-memory SQLite and a local fetch adapter. No production credentials or network.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{DatabaseSync}=require('node:sqlite'),{randomUUID}=require('node:crypto'),ts=require('typescript');
const root=path.resolve(__dirname,'..'),db=new DatabaseSync(':memory:');
db.exec(fs.readFileSync(path.join(root,'supplier-backend/schema.sql'),'utf8'));db.exec(fs.readFileSync(path.join(root,'supplier-backend/network-schema.sql'),'utf8'));
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,file);
const prepared=(sql,args=[])=>({bind(...values){return prepared(sql,values)},async all(){return {results:db.prepare(sql).all(...args)}},async first(){return db.prepare(sql).get(...args)},async run(){const r=db.prepare(sql).run(...args);return {success:true,meta:{changes:Number(r.changes)}}},execute(){const s=db.prepare(sql);if(s.columns().length)return {success:true,results:s.all(...args),meta:{changes:0}};const r=s.run(...args);return {success:true,results:[],meta:{changes:Number(r.changes)}};}});
const env={API_KEY:'local-api-test',CRM_KEY:'local-crm-test',DB:{prepare:prepared,async batch(stmts){db.exec('BEGIN');try{const result=stmts.map(s=>s.execute());db.exec('COMMIT');return result;}catch(e){db.exec('ROLLBACK');throw e;}}}};
process.env.SUPPLIER_BACKEND_URL='https://local.invalid';process.env.SUPPLIER_BACKEND_KEY=env.API_KEY;process.env.NETWORK_HUB_ENABLED='true';
(async()=>{
const {parseInventory}=await import('../app/lib/supplier-csv.mjs');
const worker=(await import('../supplier-backend/worker.mjs')).default;
global.fetch=(url,init)=>{assert.ok(String(url).startsWith('https://local.invalid/'),'No external requests in this test');return worker.fetch(new Request(url,init),env)};
const {networkAction,networkDashboard}=require('../app/lib/network-server.ts'),{marketAction,dashboard}=require('../app/lib/supplier-market.ts');
const {csvText,templates,parseNetworkCSV,downloadTemplate}=await import('../app/lib/network-csv.mjs');
const a={id:'buyer',email:'buyer@example.test',status:'Approved',network_status:'Approved',profile:JSON.stringify({networkOptIn:true,businessName:'Test buyer'})},b={...a,id:'supplier',email:'supplier@example.test'},c={...a,id:'outsider',status:'Pending review',email:'outsider@example.test'};
for(const x of [a,b,c])db.prepare('INSERT INTO supplier_accounts (id,email,password_hash,recovery_hash,profile,status,network_status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)').run(x.id,x.email,'unused','unused',x.profile,x.status,x.network_status,new Date().toISOString(),new Date().toISOString());
const row={item_ref:'LAP-1',product:'Laptop',specifications:'16 GB RAM, 512 GB SSD',quantity:50,condition:'Refurbished',city:'Toronto',country:'Canada',needed_by:new Date(Date.now()+86400000).toISOString().slice(0,10),partial_allowed:'Yes'};
assert.equal(parseNetworkCSV('requirements',csvText(templates.requirements,[row]))[0].quantity,50);
assert.throws(()=>parseNetworkCSV('requirements',downloadTemplate('requirements')),/1–500/);
for(const change of [{quantity:'1.5'},{quantity:-1},{needed_by:'2026-02-30'},{product:'=DANGER()'},{city:'email@example.test'},{partial_allowed:'true'}])assert.throws(()=>parseNetworkCSV('requirements',csvText(templates.requirements,[{...row,...change}])));
await assert.rejects(()=>networkAction('network-post',{rows:[row],submissionKey:randomUUID()},c),/Approved/);
const key=randomUUID();await networkAction('network-post',{rows:[row],submissionKey:key},a);await networkAction('network-post',{rows:[row],submissionKey:key},a);
assert.equal(db.prepare('SELECT COUNT(*) n FROM network_posts').get().n,1,'Retry does not duplicate requirement');
assert.equal((await networkDashboard(a)).networkItems[0].own,1,'Own requirements visible and labelled');assert.equal((await networkDashboard(c)).networkItems.length,0,'Unapproved cannot browse');
const visible=(await networkDashboard(b)).networkItems[0];assert.deepEqual(Object.keys(visible).sort(),['id','post_id','item_ref','product','specifications','quantity','condition','city','country','needed_by','partial_allowed','title','created_at','own'].sort(),'Shared requirement uses an explicit safe field list');for(const privateKey of ['account_id','email','businessName','unit_cost'])assert.equal(visible[privateKey],undefined);
assert.equal((await networkDashboard(b)).notifications.length,1);assert.equal((await networkDashboard(c)).notifications.length,0);
await assert.rejects(()=>networkAction('network-edit',{id:visible.post_id,revision:1,rows:[row]},b),/changed or is closed/);
await networkAction('network-edit',{id:visible.post_id,revision:1,rows:[{...row,specifications:'Updated exact specifications'}]},a);
assert.equal((await networkDashboard(b)).networkItems[0].specifications,'Updated exact specifications');
assert.equal((await networkDashboard(a)).myPosts[0].revision,2);
await assert.rejects(()=>networkAction('network-edit',{id:visible.post_id,revision:1,rows:[row]},a),/changed/);
const offer={requirement_id:visible.post_id,item_ref:visible.item_ref,quantity:40,unit_price:320,currency:'CAD',condition:'Refurbished',lead_days:7,product_details:'Exact laptop model',terms:'Shipping and tax quoted separately'};
await assert.rejects(()=>networkAction('network-offer',{rows:[offer]},a),/no longer open/);
await networkAction('network-offer',{rows:[offer]},b);await networkAction('network-offer',{rows:[offer]},b);
await assert.rejects(()=>networkAction('network-edit',{id:visible.post_id,revision:2,rows:[row]},a),/Responses have arrived/);
assert.equal((await networkDashboard(b)).networkItems[0].specifications,'Updated exact specifications');
assert.equal(db.prepare('SELECT COUNT(*) n FROM network_offers').get().n,1,'Retry updates existing offer');assert.equal((await networkDashboard(a)).myPosts[0].offered,0,'No requester claim before CRM capture');
const crm=async(route,body={})=>{const r=await worker.fetch(new Request('https://local.invalid/crm/'+route,{method:'POST',headers:{Authorization:'Bearer '+env.CRM_KEY,'Content-Type':'application/json'},body:JSON.stringify(body)}),env);assert.equal(r.status,200);return r.json()};
const {perform,accountForSession}=require('../app/lib/supplier-server.ts');
const profile={businessName:'Test applicant',contactName:'Test owner',position:'Owner',phone:'+1 416 555 0100',location:'Toronto, Canada',evidence:'https://example.test',products:'Laptops',regions:'Canada',tradeTerms:'By quotation',warranty:'By quotation',businessType:'B2B reseller',supplyModel:'Stocked',categories:['Laptops'],conditions:['Refurbished'],b2bConfirmed:true,privacyAccepted:true,networkOptIn:true};
const application=await perform('register',{email:'applicant@example.test',password:'Local-only-passphrase-2026',profile},undefined,'test');
assert.ok(application.applicationId);assert.equal(application.session,undefined,'Application cannot open a session');
await assert.rejects(()=>perform('login',{email:'applicant@example.test',password:'Local-only-passphrase-2026'},undefined,'test'),/only after/);
const review={id:application.applicationId,revision:1,status:'Approved',networkStatus:'Approved',reviewer:'Test owner',evidenceChecked:'Test B2B evidence checked',note:'Welcome'};
const early=await worker.fetch(new Request('https://local.invalid/crm/review',{method:'POST',headers:{Authorization:'Bearer '+env.CRM_KEY},body:JSON.stringify(review)}),env);assert.equal(early.status,409,'CRM must capture application before activation');
await crm('ack',{items:[{id:application.applicationId,revision:1}]});await crm('review',review);
await assert.rejects(()=>perform('login',{email:'applicant@example.test',password:'Local-only-passphrase-2026'},undefined,'test'),/activation email/);
const mail=(await crm('activation-emails')).emails;assert.equal(mail.length,1);assert.equal(mail[0].email,'applicant@example.test');
const claim=await crm('activation-email-claim',{id:mail[0].id});assert.equal(claim.claimed,true);assert.match(claim.verificationToken,/^[a-f0-9]{64}$/);
assert.equal((await crm('activation-email-claim',{id:mail[0].id})).claimed,false,'Do not send twice');
await assert.rejects(()=>perform('login',{email:'applicant@example.test',password:'Local-only-passphrase-2026',emailVerificationToken:'0'.repeat(64)},undefined,'test'),/expired or was replaced/);
const activated=await perform('login',{email:'applicant@example.test',password:'Local-only-passphrase-2026',emailVerificationToken:claim.verificationToken},undefined,'test');assert.ok(activated.session);assert.ok(await accountForSession(activated.session));
assert.equal(db.prepare('SELECT token_hash FROM supplier_email_verifications WHERE account_id=?').get(application.applicationId).token_hash,'','Single-use token erased');
await crm('activation-email-result',{id:mail[0].id,state:'Sent'});assert.equal((await crm('activation-emails')).emails.length,0);
db.prepare("UPDATE supplier_accounts SET status='Suspended' WHERE id=?").run(application.applicationId);assert.equal(await accountForSession(activated.session),null,'Suspension revokes access');
const exportData=await crm('network-export');assert.equal(exportData.offers[0].email,b.email,'CRM receives private supplier contact');assert.equal(exportData.items.length,1);
const offered=exportData.offers[0];await crm('network-ack',{kind:'offer',id:offered.id,revision:1});assert.equal((await networkDashboard(a)).myPosts[0].offered,0,'Stale ack cannot publish newer offer');
await crm('network-ack',{kind:'offer',id:offered.id,revision:offered.revision});await crm('network-ack',{kind:'offer',id:offered.id,revision:offered.revision});
assert.equal((await networkDashboard(a)).myPosts[0].offered,40);assert.equal((await networkDashboard(a)).notifications.filter(n=>n.kind==='Response').length,1,'Ack retry does not duplicate notification');
assert.equal((await networkDashboard(a)).myOffers.length,0,'Requester cannot see supplier offers/prices');
await assert.rejects(()=>networkAction('network-offer',{rows:[{...offer,quantity:51}]},b),/quantity/);
await assert.rejects(()=>networkAction('network-close',{id:visible.post_id},b),/does not belong/);
await networkAction('network-close',{id:visible.post_id},a);await assert.rejects(()=>networkAction('network-offer',{rows:[offer]},b),/no longer open/);
assert.throws(()=>db.prepare('UPDATE network_offers SET quantity=2 WHERE id=?').run(offered.id),/unavailable/,'DB rejects a race after closure');
const inventory='sku,product,quantity,condition,city,country,unit_cost,currency\nPRIVATE-SKU,Laptop,25,Refurbished,Toronto,Canada,250,CAD\n';
await marketAction('upload',{csv:inventory,shareWithMembers:true},b);assert.equal((await dashboard(a)).listings.length,1,'Approved member inventory posts without second review');
await marketAction('upload',{csv:inventory.replace(',25,',',12,'),shareWithMembers:true},b);assert.equal((await dashboard(a)).listings.length,1,'Replacement hides previous inventory');assert.equal((await dashboard(a)).listings[0].quantity,12);
assert.equal((await dashboard(b)).listings[0].own,1,'Own stock visible and labelled');
const moqCsv=inventory.replace('unit_cost,currency','unit_cost,currency,minimum_quantity').trim()+',5\n';assert.equal(parseInventory(moqCsv)[0].minimumQuantity,5);assert.throws(()=>parseInventory(moqCsv.replace(',5\n',',0\n')),/minimum quantity/);db.prepare('UPDATE supplier_stock SET minimum_quantity=5 WHERE upload_id IN (SELECT id FROM supplier_uploads WHERE status=?)').run('Approved');const priced=(await dashboard(a)).listings[0];assert.equal(priced.minimum_quantity,5);await assert.rejects(()=>marketAction('request',{stockId:priced.id,quantity:4,notes:'Below minimum'},a),/no longer available/);await marketAction('request',{stockId:priced.id,quantity:5,notes:'At minimum'},a);
const {marketplace}=require('../app/lib/marketplace.ts');
const marketResult=await marketplace(a,{q:'Laptop Toronto'});assert.equal(marketResult.stockTotal,1);assert.equal(marketResult.listings[0].unit_cost,undefined);assert.equal(marketResult.listings[0].email,undefined);
assert.equal((await marketplace(a,{q:'No matching product'})).stockTotal,0);await assert.rejects(()=>marketplace(c,{}),/Approved/);
const currentUpload=db.prepare("SELECT id FROM supplier_uploads WHERE status='Approved' LIMIT 1").get().id;
for(let i=0;i<45;i++)db.prepare('INSERT INTO supplier_stock (id,upload_id,sku,product,quantity,condition,city,country,unit_cost,currency) VALUES (?,?,?,?,?,?,?,?,?,?)').run('page-'+i,currentUpload,'page-'+i,'Paging fixture',1,'Used','Toronto','Canada',999,'CAD');
const page1=await marketplace(a,{q:'Paging fixture'}),page2=await marketplace(a,{q:'Paging fixture',stockPage:'2'}),page3=await marketplace(a,{q:'Paging fixture',stockPage:'3'});
assert.equal(page1.stockTotal,45);assert.equal(page1.listings.length,20);assert.equal(page2.listings.length,20);assert.equal(page3.listings.length,5);assert.equal(new Set([...page1.listings,...page2.listings,...page3.listings].map(r=>r.id)).size,45);
db.prepare("DELETE FROM supplier_stock WHERE product='Paging fixture'").run();
assert.equal((await dashboard(b)).myStock[0].unit_cost,250);assert.equal((await dashboard(b)).myStock[0].id,(await dashboard(b)).listings[0].id,'Own private cost matches displayed listing');
assert.equal((await dashboard(a)).myStock.length,0);
for(const key of ['unit_cost','sku','account_id','email'])assert.equal((await dashboard(a)).listings[0][key],undefined);
const viewerData=await dashboard(a);assert.equal(viewerData.uploads.length,0,'Another supplier original uploads are not returned');assert.equal(viewerData.myOffers.length,0,'Other supplier offers are not returned');assert.deepEqual(Object.keys(viewerData.listings[0]).sort(),['id','product','quantity','minimum_quantity','condition','city','country','updatedAt','own'].sort(),'Shared stock uses only approved public fields');const otherNotice=(await networkDashboard(b)).notifications[0];await networkAction('network-read',{id:otherNotice.id},a);assert.equal((await networkDashboard(b)).notifications[0].read_at,null,'Cannot mark another member notification read');
const ownStockId=(await dashboard(b)).listings[0].id;await assert.rejects(()=>marketAction('request',{stockId:ownStockId,quantity:1,notes:''},b),/no longer available/);
db.prepare("UPDATE supplier_uploads SET created_at=? WHERE status='Approved'").run(new Date(Date.now()-31*86400000).toISOString());assert.equal((await dashboard(a)).listings.length,0,'30-day visibility enforced');
const bulkRows=Array.from({length:25},(_,n)=>({...row,item_ref:'BULK-'+n}));
await networkAction('network-post',{rows:bulkRows,submissionKey:randomUUID()},a);
const bulk=(await networkDashboard(a)).myPosts.find(p=>p.item_ref==='BULK-0');
await networkAction('network-edit',{id:bulk.id,revision:1,rows:bulkRows.map(r=>({...r,quantity:7}))},a);
assert.equal((await networkDashboard(a)).myPosts.filter(p=>p.id===bulk.id&&p.quantity===7).length,25,'Bulk edit stays within backend statement limit');
console.log('PASS: strict CSVs, member gates, privacy, requirement retry, partial responses, CRM revision acknowledgements, notification deduplication, ownership, close-race guard, direct inventory and expiry. No external access.');
if(process.argv.includes('--serve')){
 const http=require('node:http');
 const {hashPassword}=require('../app/lib/supplier-server.ts');const hash=await hashPassword('Demo-only-passphrase-2026');
 for(const x of [a,b]){const profile={businessName:x.id==='buyer'?'Example Wholesale':'Sample Supply Co.',contactName:'Demo contact',position:'Owner',phone:'+1 416 555 0100',location:'Toronto, Canada',evidence:'https://example.test',products:'Laptops and servers',regions:'Canada',tradeTerms:'Trade quotations',warranty:'By quotation',businessType:'B2B reseller',supplyModel:'Stocked',categories:['Laptops'],conditions:['Refurbished'],b2bConfirmed:true,privacyAccepted:true,enquiryOptIn:true,networkOptIn:true};db.prepare('UPDATE supplier_accounts SET password_hash=?,profile=? WHERE id=?').run(hash,JSON.stringify(profile),x.id);}
 db.prepare("UPDATE supplier_uploads SET created_at=? WHERE status='Approved'").run(new Date().toISOString());
 db.prepare("UPDATE network_posts SET status='Open' WHERE id=?").run(visible.post_id);
 await networkAction('network-post',{rows:[{...row,item_ref:'SERVER-1',product:'Tower servers',quantity:10,specifications:'ECC memory and RAID. Exact model requested.'}],submissionKey:randomUUID()},b);
 const server=http.createServer(async(req,res)=>{try{let raw='';for await(const chunk of req)raw+=chunk;const r=await worker.fetch(new Request('http://127.0.0.1:3133'+req.url,{method:req.method,headers:req.headers,body:raw||undefined}),env);res.writeHead(r.status,Object.fromEntries(r.headers));res.end(await r.text());}catch(e){res.writeHead(500);res.end('Local fixture failed');}});
 server.listen(3133,'127.0.0.1',()=>console.log('ISOLATED TEST BACKEND http://127.0.0.1:3133; demo sign-in buyer@example.test / Demo-only-passphrase-2026'));
 process.on('SIGINT',()=>server.close(()=>{db.close();process.exit(0)}));
}else db.close();
})().catch(e=>{console.error(e);db.close();process.exitCode=1;});


