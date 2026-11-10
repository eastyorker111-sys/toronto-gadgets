export const templates={
 inventory:['sku','product','quantity','condition','city','country','unit_cost','currency'],
 requirements:['item_ref','product','specifications','quantity','condition','city','country','needed_by','partial_allowed'],
 offers:['requirement_id','item_ref','quantity','unit_price','currency','condition','lead_days','product_details','terms']
};
export function csvText(headers,rows){return [headers,...rows.map(r=>headers.map(h=>r[h]??''))].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n')+'\r\n';}
export function downloadTemplate(kind,items=[]){if(!templates[kind])throw Error('Choose an upload type.');return csvText(templates[kind],kind==='offers'?items.map(i=>({requirement_id:i.post_id,item_ref:i.item_ref})):[]);}
export function readCSV(input,headers){
 if(typeof input!=='string'||new TextEncoder().encode(input).length>500000)throw Error('Choose a CSV no larger than 500 KB.');
 const rows=[];let cells=[],cell='',quoted=false,closed=false;input=input.replace(/^\uFEFF/,'');
 const endCell=()=>{cells.push(cell.trim());cell='';closed=false;};const endRow=()=>{endCell();if(cells.some(Boolean))rows.push(cells);cells=[];};
 for(let i=0;i<input.length;i++){const c=input[i];if(quoted){if(c==='"'){if(input[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=c;continue;}if(c==='"'){if(cell||closed)throw Error('Invalid CSV quotation.');quoted=true;}else if(c===',')endCell();else if(c==='\n'||c==='\r'){if(c==='\r'&&input[i+1]==='\n')i++;endRow();}else{if(closed&&c!==' ')throw Error('Unexpected text after a quoted value.');cell+=c;}}
 if(quoted)throw Error('An opening quote has no closing quote.');endRow();
 if(rows.length<2||rows.length>501)throw Error('Include 1–500 completed item rows.');
 if(JSON.stringify(rows[0])!==JSON.stringify(headers))throw Error('Download the matching template. Keep its column names and order unchanged.');
 return rows.slice(1).map((r,i)=>{if(r.length!==headers.length)throw Error(`Row ${i+2}: expected ${headers.length} columns.`);return Object.fromEntries(headers.map((h,j)=>[h,r[j]]));});
}
function plain(v,label,max=500,required=true){if(typeof v!=='string'||v.length>max||(required&&!v.trim())||/^[=+@\-\t\r]/.test(v)||/[\u0000-\u0008\u000b-\u001f]/.test(v))throw Error(`${label}: enter plain text${required?' (required)':''}, up to ${max} characters.`);return v.trim();}
function shared(v,label,max=500){const s=plain(v,label,max);if(/@|https?:|www\.|\b\d[\d ()+.-]{7,}\d\b/i.test(s))throw Error(`${label}: remove contact details and links. Responses go through TG.`);return s;}
function integer(v,label,min,max){if(!/^\d+$/.test(String(v))||!Number.isSafeInteger(Number(v))||Number(v)<min||Number(v)>max)throw Error(`${label}: use a whole number from ${min} to ${max}.`);return Number(v);}
export function validateRows(kind,rows,today=new Date().toISOString().slice(0,10)){
 if(!['requirements','offers'].includes(kind)||!Array.isArray(rows)||!rows.length||rows.length>500)throw Error('Include 1–500 items.');
 const seen=new Set();return rows.map((r,i)=>{try{
 const item_ref=plain(r.item_ref,'Item reference',80);if(!/^[A-Za-z0-9_.-]+$/.test(item_ref))throw Error('Item reference: use letters, numbers, dots, dashes or underscores.');
 const key=kind==='offers'?r.requirement_id+'|'+item_ref:item_ref;if(seen.has(key))throw Error('Duplicate item reference.');seen.add(key);
 const quantity=integer(r.quantity,'Quantity',1,1000000);const condition=plain(r.condition,'Condition',30);if(!['New','Refurbished','Used','New or refurbished','Any'].includes(condition))throw Error('Condition: use New, Refurbished, Used, New or refurbished, or Any.');
 if(kind==='requirements'){
 const needed_by=plain(r.needed_by,'Needed-by date',10);if(!/^\d{4}-\d{2}-\d{2}$/.test(needed_by)||Number.isNaN(Date.parse(needed_by))||new Date(needed_by).toISOString().slice(0,10)!==needed_by||needed_by<today||needed_by>new Date(Date.parse(today)+365*86400000).toISOString().slice(0,10))throw Error('Needed-by date: use YYYY-MM-DD, today through the next 365 days.');
 if(!['Yes','No'].includes(r.partial_allowed))throw Error('Partial allowed: use Yes or No.');
 return {item_ref,product:shared(r.product,'Product',200),specifications:shared(r.specifications,'Specifications',1000),quantity,condition,city:shared(r.city,'City',100),country:shared(r.country,'Country',100),needed_by,partial_allowed:r.partial_allowed};
 }
 const requirement_id=plain(r.requirement_id,'Requirement reference',100);if(!/^TG-NEED-[a-f0-9-]+$/i.test(requirement_id)&&!/^DEMO-/.test(requirement_id))throw Error('Use the requirement reference from its downloaded template.');
 if(!/^\d{1,8}(\.\d{1,2})?$/.test(String(r.unit_price))||Number(r.unit_price)<=0)throw Error('Unit price: enter a positive amount with at most two decimal places.');
 if(!['CAD','USD'].includes(r.currency))throw Error('Currency: use CAD or USD.');if(!['New','Refurbished','Used'].includes(condition))throw Error('Offer condition: choose New, Refurbished or Used.');
 return {requirement_id,item_ref,quantity,unit_price:Number(r.unit_price),currency:r.currency,condition,lead_days:integer(r.lead_days,'Lead days',0,365),product_details:plain(r.product_details,'Product details',1000),terms:plain(r.terms,'Terms',1000)};
 }catch(e){throw Error(`Row ${i+2}: ${e.message}`);}});
}
export function parseNetworkCSV(kind,csv){return validateRows(kind,readCSV(csv,templates[kind]));}
