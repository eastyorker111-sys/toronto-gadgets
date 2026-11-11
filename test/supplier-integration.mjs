import assert from 'node:assert/strict';
import fs from 'node:fs';
import {randomUUID} from 'node:crypto';
const origin=process.env.PORTAL_TEST_ORIGIN||'http://localhost:3107';
const keys=JSON.parse(fs.readFileSync('.env.portal-private.json'));
const backend='https://toronto-gadgets-supplier-portal.east-yorker111.workers.dev';
const ids=[];const suffix=randomUUID();
async function db(statements){const r=await fetch(backend+'/query',{method:'POST',headers:{Authorization:'Bearer '+keys.apiKey,'Content-Type':'application/json'},body:JSON.stringify({statements})});assert.equal(r.status,200);return (await r.json()).results;}
async function call(action,data={},cookie='',requestOrigin=origin){const r=await fetch(origin+'/api/suppliers',{method:'POST',headers:{Origin:requestOrigin,'Content-Type':'application/json',Cookie:cookie},body:JSON.stringify({action,...data})});return {status:r.status,data:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};}
async function get(cookie=''){const r=await fetch(origin+'/api/suppliers',{headers:{Cookie:cookie}});return r.json();}
const profile={businessName:'TEST ONLY Trade '+suffix,contactName:'Test contact',position:'Owner',phone:'+1 416 555 0100',location:'Toronto, Canada',evidence:'https://example.com',products:'Servers',regions:'Canada',tradeTerms:'Trade quotes',warranty:'By quotation',businessType:'B2B reseller',supplyModel:'Stocked',categories:['Servers'],conditions:['New'],b2bConfirmed:true,privacyAccepted:true,enquiryOptIn:true,networkOptIn:true};
try{
 assert.equal((await fetch(backend+'/query',{method:'POST',body:'{}'})).status,401);
 assert.equal((await call('register',{},'','https://evil.example')).status,403);
 assert.equal((await get()).account,null);
 const a=await call('register',{email:`qa-a-${suffix}@example.test`,password:'Test-only-passphrase-2026',profile});assert.equal(a.status,200,JSON.stringify(a.data));ids.push(a.data.account.id);
 const b=await call('register',{email:`qa-b-${suffix}@example.test`,password:'Test-only-passphrase-2026',profile:{...profile,businessName:'Second test supplier'}});assert.equal(b.status,200);ids.push(b.data.account.id);
 assert.equal(a.data.account.status,'Pending review');assert.ok(a.data.recoveryCode);assert.equal((await get(a.cookie)).listings.length,0);
 assert.ok(!JSON.stringify(a.data.account).includes('password_hash'));
 assert.equal((await call('register',{email:`bad-${suffix}@example.test`,password:'Test-only-passphrase-2026',profile:{...profile,b2bConfirmed:false}})).status,400);
 assert.equal((await call('upload',{csv:'bad'},a.cookie)).status,400);
 await db(ids.map(id=>({sql:"UPDATE supplier_accounts SET status='Approved',network_status='Approved' WHERE id=?",params:[id]})));
 const csv='sku,product,quantity,condition,city,country,unit_cost,currency\nPRIVATE-SKU,Test enterprise server,5,New,Toronto,Canada,100,CAD\n';
 const up=await call('upload',{csv,shareWithMembers:true},a.cookie);assert.equal(up.status,200,JSON.stringify(up.data));const upload=up.data.uploads[0].id;
 assert.equal((await get(b.cookie)).listings.length,0,'Unreviewed stock hidden');
 await db([{sql:"UPDATE supplier_uploads SET status='Approved' WHERE id=?",params:[upload]}]);
 const market=await get(b.cookie);assert.equal(market.listings.length,1);const stock=market.listings[0];
 for(const banned of ['supplier_id','account_id','sku','unit_cost','email','businessName','upload_id'])assert.equal(stock[banned],undefined,'Private field '+banned);
 assert.equal((await get(a.cookie)).listings.length,0,'Own inventory is not an external opportunity');
 const request=await call('request',{stockId:stock.id,quantity:2,notes:'Testing only'},b.cookie);assert.equal(request.status,200);
 assert.equal((await call('request',{stockId:stock.id,quantity:9,notes:''},b.cookie)).status,400);
 await call('update',{id:b.data.account.id,profile:{...profile,networkOptIn:false}},a.cookie);
 const afterA=await get(a.cookie),afterB=await get(b.cookie);assert.equal(afterA.account.status,'Approved','Optional withdrawal preserves supplier approval');assert.equal(afterA.member,false);assert.equal(afterB.account.profile.businessName,'Second test supplier','Cannot update another account');assert.equal(afterB.listings.length,0);
 await db([{sql:"UPDATE supplier_accounts SET network_status='Approved',profile=? WHERE id=?",params:[JSON.stringify(profile),ids[0]]},{sql:'UPDATE supplier_uploads SET created_at=? WHERE id=?',params:[new Date(Date.now()-31*86400000).toISOString(),upload]}]);
 assert.equal((await get(b.cookie)).listings.length,0,'30-day expiry enforced server-side');
 const recovery=await call('recover',{email:a.data.account.email,password:'New-test-only-passphrase-2026',recoveryCode:a.data.recoveryCode});assert.equal(recovery.status,200);assert.equal((await get(a.cookie)).account,null,'Old sessions revoked');
 assert.equal((await call('recover',{email:a.data.account.email,password:'Another-test-passphrase-2026',recoveryCode:a.data.recoveryCode})).status,400,'Recovery code is single-use');
 await call('logout',{},b.cookie);assert.equal((await get(b.cookie)).account,null);
 console.log('PASS: authorization, CSRF, B2B gate, account isolation, inventory privacy, review gate, enquiries, consent separation, 30-day expiry, recovery and logout.');
}finally{
 for(const id of ids)await db([
 {sql:'DELETE FROM supplier_market_requests WHERE account_id=? OR stock_id IN (SELECT s.id FROM supplier_stock s JOIN supplier_uploads u ON u.id=s.upload_id WHERE u.account_id=?)',params:[id,id]},
 {sql:'DELETE FROM supplier_stock WHERE upload_id IN (SELECT id FROM supplier_uploads WHERE account_id=?)',params:[id]},
 {sql:'DELETE FROM supplier_uploads WHERE account_id=?',params:[id]},
 {sql:'DELETE FROM supplier_sessions WHERE account_id=?',params:[id]},
 {sql:'DELETE FROM supplier_events WHERE account_id=?',params:[id]},
 {sql:'DELETE FROM supplier_accounts WHERE id=?',params:[id]}]);
 console.log('Removed only this run’s labelled test records.');
}
