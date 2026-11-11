import test from 'node:test';
import assert from 'node:assert/strict';
import {validateProfile} from '../app/lib/supplier-policy.mjs';
import {parseInventory,csvHeaders,csvTemplate} from '../app/lib/supplier-csv.mjs';
const p={businessName:'Example Trade',contactName:'Test contact',position:'Owner',phone:'+1 (416) 555-0100',location:'Toronto, Canada',evidence:'https://example.com',products:'Servers',regions:'Canada',tradeTerms:'Trade quotes; no minimum',warranty:'By written quotation',businessType:'B2B reseller',supplyModel:'Stocked',categories:['Servers'],conditions:['New'],b2bConfirmed:true,privacyAccepted:true};
test('trade eligibility required; optional choices default false; forged approval discarded',()=>{const r=validateProfile({...p,status:'Approved',networkStatus:'Approved'});assert.equal(r.networkOptIn,false);assert.equal(r.enquiryOptIn,false);assert.equal(r.status,undefined);for(const bad of [{b2bConfirmed:false},{businessType:'Retail only'},{privacyAccepted:false},{categories:['Fake']},{evidence:'javascript:alert(1)'}])assert.throws(()=>validateProfile({...p,...bad}));});
test('B2B single units and independently reviewable free-email businesses are not excluded',()=>assert.equal(validateProfile(p).tradeTerms,p.tradeTerms));
test('CSV handles quoted commas and rejects duplicate SKUs, formulas, invalid quantities and sample stock',()=>{const h=csvHeaders.join(',')+'\n';const good='ABC,"Server, rack",12,New,Toronto,Canada,100,CAD';assert.equal(parseInventory(h+good)[0].product,'Server, rack');for(const s of [csvTemplate,h+good+'\n'+good,h+'ABC,=HYPERLINK(),12,New,Toronto,Canada,100,CAD',h+'ABC,Server,-1,New,Toronto,Canada,100,CAD',h+'ABC,Server,1.5,New,Toronto,Canada,100,CAD',h+'ABC,test@example.com,1,New,Toronto,Canada,100,CAD'])assert.throws(()=>parseInventory(s));});

test('required identity and contact fields reject omitted, blank and invalid values',()=>{
 for(const key of ['businessName','contactName','position','phone']) {
  const missing={...p};delete missing[key];assert.throws(()=>validateProfile(missing));
  assert.throws(()=>validateProfile({...p,[key]:'   '}));
 }
 for(const phone of ['abc1234567','123','1234567890123456'])assert.throws(()=>validateProfile({...p,phone}));
 assert.equal(validateProfile(p).position,'Owner');
 assert.equal(validateProfile(p).phone,'+1 (416) 555-0100');
});
