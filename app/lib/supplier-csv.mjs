export const csvHeaders=['sku','product','quantity','condition','city','country','unit_cost','currency'];
export const csvTemplate=csvHeaders.join(',')+'\nEXAMPLE-001,Example business laptop,10,Refurbished,Toronto,Canada,250,CAD\n';
export function parseInventory(csv) {
  if(typeof csv!=='string'||new TextEncoder().encode(csv).length>500000) throw new Error('Upload a CSV smaller than 500 KB.');
  const rows=[]; let row=[],cell='',quoted=false,closed=false;
  csv=csv.replace(/^\uFEFF/,'');
  for(let i=0;i<csv.length;i++) {
    const c=csv[i];
    if(quoted) {if(c==='"'){if(csv[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=c;continue;}
    if(c==='"'){if(cell||closed)throw new Error('Invalid CSV quoting.');quoted=true;continue;}
    if(c===','||c==='\n'||c==='\r') {row.push(cell.trim());cell='';closed=false;if(c!==','){if(c==='\r'&&csv[i+1]==='\n')i++;if(row.some(Boolean))rows.push(row);row=[];}continue;}
    if(closed&&c!==' ')throw new Error('Invalid CSV quoting.');
    cell+=c;
  }
  if(quoted)throw new Error('Unclosed CSV quotation.');
  row.push(cell.trim());if(row.some(Boolean))rows.push(row);
  if(rows.length<2||rows.length>501)throw new Error('Include 1–500 product rows.');
  if(rows[0].join(',').toLowerCase()!==csvHeaders.join(','))throw new Error('Use the template column names in their original order.');
  const skus=new Set();
  return rows.slice(1).map((r,index)=>{
    const n=index+2;
    if(r.length!==8||r.some(v=>/^[=+@\-\t\r]/.test(v)||v.length>250||/[\u0000-\u001f]/.test(v)))throw new Error(`Check row ${n}: invalid cell or formula. Use plain text only.`);
    const [sku,product,qty,condition,city,country,cost,currency]=r;
    if(!sku||!product||!city||!country||skus.has(sku.toLowerCase()))throw new Error(`Row ${n}: enter a unique SKU, product and location.`);
    if(sku==='EXAMPLE-001')throw new Error('Replace the example row with your own stock.');
    if(!/^\d{1,7}$/.test(qty)||!['New','Refurbished','Used'].includes(condition))throw new Error(`Row ${n}: quantity must be a whole number; condition must be New, Refurbished or Used.`);
    if((cost&&!/^\d{1,8}(\.\d{1,2})?$/.test(cost))||!['CAD','USD',''].includes(currency.toUpperCase())||(cost&&!currency))throw new Error(`Row ${n}: check unit cost and currency (CAD or USD).`);
    if(/@|https?:|www\.|\b\d[\d ()+.-]{7,}\d\b/i.test(product))throw new Error(`Row ${n}: remove contact details or links from the product description.`);
    skus.add(sku.toLowerCase());
    return {sku,product,quantity:Number(qty),condition,city,country,unitCost:cost?Number(cost):null,currency:currency.toUpperCase()};
  });
}
