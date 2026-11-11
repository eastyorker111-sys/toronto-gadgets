import {redirect} from 'next/navigation';
export const metadata={title:'TG Networking member sign in',robots:{index:false,follow:false}};
export default function HowItWorks(){redirect('/tg-networking/account?mode=login');}
