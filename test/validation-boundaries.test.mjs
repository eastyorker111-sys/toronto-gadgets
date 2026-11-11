import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import worker from '../supplier-backend/worker.mjs';
import {parseInventory,csvHeaders} from '../app/lib/supplier-csv.mjs';

test('CSV rejects malformed quoting, hidden formulas, duplicate case variants and oversized lists',()=>{
  const h=csvHeaders.join(',')+'\n';
  const valid='SKU-1,Server,10,New,Toronto,Canada,100,CAD,2';
  assert.equal(parseInventory('\uFEFF'+h+valid)[0].minimumQuantity,2);
  for(const row of ['SKU-1,"Server,10,New,Toronto,Canada,100,CAD,2','SKU-1,"Server"junk,10,New,Toronto,Canada,100,CAD,2','SKU-1,\t=HYPERLINK(),10,New,Toronto,Canada,100,CAD,2','SKU-1,Server,10,New,Toronto,Canada,100,CAD,11']) assert.throws(()=>parseInventory(h+row));
  assert.throws(()=>parseInventory(h+valid+'\n'+valid.replace('SKU-1','sku-1')));
  assert.throws(()=>parseInventory(h+Array.from({length:501},(_,i)=>valid.replace('SKU-1','SKU-'+i)).join('\n')));
  assert.throws(()=>parseInventory(h+'x'.repeat(500001)));
});

test('reminder threshold is exactly 30 unchanged days; stale claims fail after replacement',async()=>{
  const db=new DatabaseSync(':memory:');
  db.exec(fs.readFileSync(new URL('../supplier-backend/schema.sql',import.meta.url),'utf8'));
  const DB={prepare(sql){
    return {bind(...params){
      return {
        async all(){return {results:db.prepare(sql).all(...params)};},
        async run(){return {meta:{changes:Number(db.prepare(sql).run(...params).changes)}};}
      };
    }};
  }};
  const fixed=Date.parse('2026-11-10T12:00:00.000Z'),originalNow=Date.now;
  Date.now=()=>fixed;
  try {
    const now=new Date(fixed).toISOString(),cutoff=fixed-30*86400000;
    db.prepare('INSERT INTO supplier_accounts (id,email,password_hash,recovery_hash,profile,status,network_status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)').run('A','offline@example.test','x','y',JSON.stringify({networkOptIn:true}),'Approved','Approved',now,now);
    db.prepare("INSERT INTO supplier_uploads (id,account_id,csv,created_at,share_with_members,status) VALUES ('U','A','offline',?,1,'Approved')").run(new Date(cutoff+1).toISOString());
    const call=async(route,body={})=>{const r=await worker.fetch(new Request('https://offline.test/crm/'+route,{method:'POST',headers:{Authorization:'Bearer offline-crm'},body:JSON.stringify(body)}),{DB,CRM_KEY:'offline-crm'});assert.equal(r.status,200);return r.json()};
    assert.equal((await call('reminders')).reminders.length,0,'One millisecond before expiry is not eligible');
    db.prepare("UPDATE supplier_uploads SET created_at=? WHERE id='U'").run(new Date(cutoff).toISOString());
    assert.equal((await call('reminders')).reminders.length,1,'At 30 days, inventory is eligible');
    db.exec("UPDATE supplier_uploads SET status='Replaced' WHERE id='U'");
    assert.equal((await call('reminder-claim',{id:'U'})).claimed,false,'A previously exported reminder cannot claim replaced stock');
  } finally {Date.now=originalNow;db.close();}
});
