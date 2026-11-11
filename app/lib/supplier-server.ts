import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { cleanEmail, validatePassword, validateProfile } from './supplier-policy.mjs';
type Statement = {sql:string; params?:unknown[]};
type Row = Record<string, any>;
export const sessionCookie = 'tg_supplier_session';
export const digest = (v:string) => createHash('sha256').update(v).digest('hex');
const token = () => randomBytes(32).toString('base64url');
export async function database(statements:Statement[]) {
  const url=process.env.SUPPLIER_BACKEND_URL, key=process.env.SUPPLIER_BACKEND_KEY;
  if(!url||!key) throw new Error('Supplier accounts are temporarily unavailable. Please try again later.');
  const response=await fetch(`${url}/query`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${key}`},body:JSON.stringify({statements}),cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!response.ok) throw new Error('Supplier accounts are temporarily unavailable. Please try again later.');
  const result=await response.json();
  if(!Array.isArray(result.results)||result.results.some((r:any)=>r.success!==true)) throw new Error('Unable to save. Please try again.');
  return result.results as {results:Row[]; meta:{changes:number}}[];
}
const query=async(sql:string,params:unknown[]=[]) => (await database([{sql,params}]))[0].results;
const derive=(password:string,salt:string) => new Promise<Buffer>((resolve,reject)=>scrypt(password,salt,64,{N:131072,r:8,p:1,maxmem:256*1024*1024},(e,k)=>e?reject(e):resolve(k)));
export async function hashPassword(password:string) {const salt=token();return `scrypt:${salt}:${(await derive(password,salt)).toString('hex')}`;}
export async function verifyPassword(password:string,stored:string) {
  const [,salt,expected]=stored.split(':');
  if(!salt||!expected) return false;
  const actual=await derive(password,salt), comparison=Buffer.from(expected,'hex');
  return actual.length===comparison.length&&timingSafeEqual(actual,comparison);
}
export async function rateLimit(identity:string,limit:number) {
  const now=Date.now(), key=digest(identity);
  const rows=await query('INSERT INTO supplier_rate_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires_at<? THEN 1 ELSE count+1 END, expires_at=CASE WHEN expires_at<? THEN excluded.expires_at ELSE expires_at END RETURNING count',[key,now+15*60*1000,now,now]);
  if(rows[0].count>limit) throw new Error('Too many attempts. Please try again in 15 minutes.');
}
export async function accountForSession(session:string|undefined) {
  if(!session||session.length>100) return null;
  return (await query("SELECT a.* FROM supplier_accounts a JOIN supplier_sessions s ON s.account_id=a.id WHERE s.token_hash=? AND s.expires_at>? AND a.status='Approved' AND a.network_status='Approved' AND json_extract(a.profile,'$.networkOptIn')=1 AND NOT EXISTS (SELECT 1 FROM supplier_email_verifications v WHERE v.account_id=a.id AND v.verified_at='')",[digest(session),Date.now()]))[0]||null;
}
export function publicAccount(a:Row) {return {id:a.id,email:a.email,profile:JSON.parse(a.profile),status:a.status,networkStatus:a.network_status,updatedAt:a.updated_at,reviewNote:a.review_note,crmSynced:a.synced_revision>=a.revision};}
async function makeSession(id:string) {
  const session=token(),now=Date.now();
  await database([
    {sql:'DELETE FROM supplier_sessions WHERE expires_at<?',params:[now]},
    {sql:'DELETE FROM supplier_rate_limits WHERE expires_at<?',params:[now]},
    {sql:'INSERT INTO supplier_sessions VALUES (?,?,?)',params:[digest(session),id,now+12*60*60*1000]}
  ]);
  return session;
}
export async function perform(action:string,body:Row,session:string|undefined,ip:string) {
  await rateLimit(`ip:${ip}`,60);
  const now=new Date().toISOString();
  if(action==='logout') {if(session) await query('DELETE FROM supplier_sessions WHERE token_hash=?',[digest(session)]);return {clearSession:true};}
  if(action==='register') {
    const email=cleanEmail(body.email),profile=validateProfile(body.profile),password=validatePassword(body.password);
    await rateLimit(`register:${ip}`,5);
    if((await query('SELECT id FROM supplier_accounts WHERE email=?',[email])).length) throw new Error('Unable to create this account. Try signing in or using your recovery code.');
    const id=`TG-S-${randomBytes(12).toString('hex')}`,recoveryCode=token(),passwordHash=await hashPassword(password);
    await database([
      {sql:'INSERT INTO supplier_accounts (id,email,password_hash,recovery_hash,profile,network_status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?)',params:[id,email,passwordHash,digest(recoveryCode),JSON.stringify(profile),profile.networkOptIn?'Requested':'Not requested',now,now]},
      {sql:'INSERT INTO supplier_email_verifications (account_id) VALUES (?)',params:[id]},
      {sql:'INSERT INTO supplier_events VALUES (?,?,?,?,?)',params:[token(),id,'Application submitted',now,JSON.stringify({policyVersion:profile.policyVersion,enquiryOptIn:profile.enquiryOptIn,networkOptIn:profile.networkOptIn})]}
    ]);
    return {clearSession:true,recoveryCode,applicationId:id,message:'Your application has been submitted to Toronto Gadgets. You cannot sign in until your business and networking membership are approved. We will email you when your account is activated. Save your recovery code privately.'};
  }
  if(action==='login'||action==='recover'||action==='resend-activation') {
    const email=cleanEmail(body.email),password=validatePassword(body.password);
    await rateLimit(`login:${email}`,10);
    const a=(await query('SELECT * FROM supplier_accounts WHERE email=?',[email]))[0];
    if(action==='login'||action==='resend-activation') {
      const valid=await verifyPassword(password,a?.password_hash||`scrypt:missing:${'0'.repeat(128)}`);
      if(!a||!valid) throw new Error('Email or password is incorrect.');
      if(a.status!=='Approved'||a.network_status!=='Approved'||!JSON.parse(a.profile).networkOptIn)throw new Error('Member sign-in is available only after Toronto Gadgets approves your application. Contact us if you need to update a pending application.');
      if(action==='resend-activation') {
        await rateLimit(`activation:${a.id}`,3);
        await query("INSERT OR IGNORE INTO supplier_activation_mail (id,account_id,revision,created_at) SELECT ?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM supplier_activation_mail WHERE account_id=? AND state IN ('Pending','Sending'))",[`${a.id}:resend:${Math.floor(Date.now()/300000)}`,a.id,-Date.now(),now,a.id]);
        return {message:'An activation email is queued, or is already being processed. Check your inbox and junk folder after the next sync. Contact TG if it does not arrive.'};
      }
      // Password plus the single-use emailed token proves mailbox possession.
      // GET/link scanners cannot verify an account or create a session.
      const verification=(await query('SELECT verified_at FROM supplier_email_verifications WHERE account_id=?',[a.id]))[0];
      if(verification&& !verification.verified_at) {
        const supplied=typeof body.emailVerificationToken==='string'?body.emailVerificationToken:'';
        if(!/^[a-f0-9]{64}$/.test(supplied))throw Error('Open your activation email link to verify your address, then sign in. Use Resend activation email if needed.');
        const verified=await database([{sql:"UPDATE supplier_email_verifications SET verified_at=?,token_hash='',expires_at=0 WHERE account_id=? AND verified_at='' AND token_hash=? AND expires_at>?",params:[now,a.id,digest(supplied),Date.now()]}]);
        if(verified[0].meta.changes!==1)throw Error('This activation link has expired or was replaced. Request another activation email.');
      }
      return {session:await makeSession(a.id),account:publicAccount(a)};
    }
    if(!a||typeof body.recoveryCode!=='string'||body.recoveryCode.length>100||digest(body.recoveryCode.trim())!==a.recovery_hash) throw new Error('Email or recovery code is incorrect.');
    const replacement=token();
    const result=await database([
      {sql:'UPDATE supplier_accounts SET password_hash=?,recovery_hash=? WHERE id=? AND recovery_hash=?',params:[await hashPassword(password),digest(replacement),a.id,a.recovery_hash]},
      {sql:'DELETE FROM supplier_sessions WHERE account_id=?',params:[a.id]}
    ]);
    if(result[0].meta.changes!==1) throw new Error('Recovery code has already been used.');
    const unverified=(await query("SELECT account_id FROM supplier_email_verifications WHERE account_id=? AND verified_at=''",[a.id])).length>0;
    const approved=a.status==='Approved'&&a.network_status==='Approved'&&JSON.parse(a.profile).networkOptIn&&!unverified;
    return approved?{session:await makeSession(a.id),recoveryCode:replacement,account:publicAccount(a)}:{clearSession:true,recoveryCode:replacement,message:'Password updated. Sign-in remains unavailable until your membership is approved.'};
  }
  const account=await accountForSession(session);
  if(!account) throw new Error('Please sign in again.');
  if(action==='update') {
    const profile=validateProfile(body.profile);
    const old=JSON.parse(account.profile);
    const tradeData=(p:Record<string,any>)=>JSON.stringify(Object.fromEntries(Object.entries(p).filter(([k])=>!['networkOptIn','enquiryOptIn','reminderOptIn','networkAlertsOptIn'].includes(k)).sort(([a],[b])=>a.localeCompare(b))));
    const changed=tradeData(old)!==tradeData(profile);
    const status=changed?'Pending review':account.status;
    const network=profile.networkOptIn?(changed||!old.networkOptIn?'Requested':account.network_status):(old.networkOptIn?'Withdrawn':account.network_status);
    await database([
      {sql:"UPDATE supplier_accounts SET profile=?,status=?,network_status=?,revision=revision+1,updated_at=?,review_note=? WHERE id=?",params:[JSON.stringify(profile),status,network,now,changed?'':account.review_note,account.id]},
      {sql:'INSERT INTO supplier_events VALUES (?,?,?,?,?)',params:[token(),account.id,'Profile updated; review required',now,JSON.stringify({enquiryOptIn:profile.enquiryOptIn,networkOptIn:profile.networkOptIn,policyVersion:profile.policyVersion})]}
    ]);
    return {account:publicAccount((await query('SELECT * FROM supplier_accounts WHERE id=?',[account.id]))[0])};
  }
  if(action==='upload'||action==='request') {
    const {marketAction}=await import('./supplier-market');
    return marketAction(action,body,account);
  }
  if(action.startsWith('network-')) {
    const {networkAction}=await import('./network-server');
    return networkAction(action,body,account);
  }
  throw new Error('Unknown action.');
}


