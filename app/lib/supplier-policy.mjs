export const businessTypes = ['Wholesaler', 'Distributor', 'Manufacturer', 'B2B reseller', 'Refurbisher / IT asset disposition'];
export const categories = ['Servers', 'Storage', 'Networking', 'Laptops', 'Desktops / workstations', 'Components', 'Phones / tablets', 'Displays / peripherals', 'Other business technology'];
export const policyVersion = '2026-11-10';
export function validateProfile(input) {
  if (!input || typeof input !== 'object') throw new Error('Complete your business profile.');
  const p = {};
  for (const [key, label, max] of [['businessName','Business name',160],['contactName','Contact name',100],['location','City and country',160],['evidence','Website or public business listing',500],['products','Products and brands',800],['regions','Supply regions',300],['tradeTerms','Trade pricing and minimum-order terms',800],['warranty','Warranty and returns',800]]) {
    if (typeof input[key] !== 'string' || input[key].trim().length < 2 || input[key].length > max) throw new Error(`${label} is required (maximum ${max} characters).`);
    p[key] = input[key].trim();
  }
  let url;
  try { url = new URL(p.evidence); } catch { throw new Error('Enter a complete business website or public listing URL.'); }
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error('Use a public http or https business link.');
  if (!businessTypes.includes(input.businessType)) throw new Error('Choose an eligible B2B or wholesale business type.');
  if (input.b2bConfirmed !== true) throw new Error('Only businesses supplying B2B or wholesale may apply.');
  if (input.privacyAccepted !== true) throw new Error('Please acknowledge the privacy information.');
  if (!Array.isArray(input.categories) || !input.categories.length || input.categories.some(c => !categories.includes(c))) throw new Error('Select at least one product category.');
  if (!['Stocked', 'Sourced to order', 'Both'].includes(input.supplyModel)) throw new Error('Choose your supply model.');
  if (!Array.isArray(input.conditions) || !input.conditions.length || input.conditions.some(c => !['New','Refurbished','Used'].includes(c))) throw new Error('Select the conditions you supply.');
  return {...p, businessType:input.businessType, categories:[...new Set(input.categories)], conditions:[...new Set(input.conditions)], supplyModel:input.supplyModel, b2bConfirmed:true, privacyAccepted:true, enquiryOptIn:input.enquiryOptIn === true, networkOptIn:input.networkOptIn === true, reminderOptIn:input.reminderOptIn !== false, networkAlertsOptIn:input.networkAlertsOptIn === true, policyVersion};
}
export function cleanEmail(value) {
  if (typeof value !== 'string' || value.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error('Enter a valid business contact email.');
  return value.trim().toLowerCase();
}
export function validatePassword(value) {
  if (typeof value !== 'string' || value.length < 12 || value.length > 128) throw new Error('Use a password between 12 and 128 characters.');
  return value;
}

