import {NextRequest,NextResponse} from 'next/server';
import {accountForSession,perform,publicAccount,sessionCookie} from '../../lib/supplier-server';
import {dashboard} from '../../lib/supplier-market';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'};
export async function GET(request:NextRequest) {
  try {const account=await accountForSession(request.cookies.get(sessionCookie)?.value);return NextResponse.json({account:account?publicAccount(account):null,...(account?await dashboard(account):{})},{headers});}
  catch {return NextResponse.json({error:'Supplier accounts are temporarily unavailable.'},{status:503,headers});}
}
export async function POST(request:NextRequest) {
  const origin=process.env.SUPPLIER_SITE_ORIGIN||'https://torontogadgets.com';
  if(request.headers.get('origin')!==origin||!request.headers.get('content-type')?.startsWith('application/json')) return NextResponse.json({error:'Request not allowed.'},{status:403,headers});
  try {
    const reader=request.body?.getReader(); if(!reader) throw new Error('Empty request.');
    let raw='',size=0; const decoder=new TextDecoder();
    while(true) {const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>600000){await reader.cancel();return NextResponse.json({error:'Request too large.'},{status:413,headers});}raw+=decoder.decode(value,{stream:true});}
    raw+=decoder.decode(); const body=JSON.parse(raw);
    const ip=request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()||request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
    const result=await perform(body.action,body,request.cookies.get(sessionCookie)?.value,ip);
    const {session,clearSession,...visible}=result as typeof result & {session?:string;clearSession?:boolean};
    const response=NextResponse.json(visible,{headers});
    if(session||clearSession) response.cookies.set(sessionCookie,session||'',{httpOnly:true,secure:origin.startsWith('https:'),sameSite:'strict',path:'/',maxAge:clearSession?0:12*60*60});
    return response;
  } catch(e) {const message=e instanceof Error?e.message:'Unable to complete this request.';return NextResponse.json({error:/SQL|constraint|fetch|JSON|Unexpected/i.test(message)?'Unable to complete this request. Please check your details and try again.':message},{status:400,headers});}
}
