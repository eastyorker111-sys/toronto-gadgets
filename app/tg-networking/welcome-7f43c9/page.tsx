import type {Metadata} from 'next';
import Link from 'next/link';
import NetworkBrand from '../../components/NetworkBrand';

const url='https://torontogadgets.com/tg-networking/welcome-7f43c9';
export const metadata:Metadata={
  title:'Welcome to TG Networking',
  description:'A short welcome guide to Available, Needed and Supply in TG Networking.',
  robots:{index:false,follow:false,googleBot:{index:false,follow:false,noimageindex:true}},
  alternates:{canonical:url},
  openGraph:{title:'Welcome to TG Networking',description:'See how to join and use the supplier network.',url},
};

// Unlisted, not access-controlled: anyone who receives this link can watch.
// Keep this route out of public navigation and the sitemap.
export default function NetworkingWelcome(){
  return <div className="shell quote-page" style={{maxWidth:1060,paddingTop:32,paddingBottom:48}}>
    <h1 aria-label="TG Networking" style={{marginBottom:12}}><NetworkBrand /></h1>
    <h2 style={{fontSize:'clamp(24px,4vw,36px)',margin:'0 0 12px'}}>Welcome to the network</h2>
    <p style={{maxWidth:720}}>See how to apply, sign in after approval, post available or needed items, and send a supply response through Toronto Gadgets.</p>
    <video controls playsInline preload="metadata" width={1920} height={1080}
      aria-label="TG Networking welcome and dashboard walkthrough"
      style={{display:'block',width:'100%',height:'auto',aspectRatio:'16 / 9',background:'#293b3b',borderRadius:8,margin:'24px 0'}}>
      <source src="/media/tg-networking-welcome.mp4" type="video/mp4" />
      Your browser cannot play this video. <a href="/media/tg-networking-welcome.mp4">Open the welcome video</a>.
    </video>
    <p><strong>Available</strong> is stock for sale. <strong>Needed</strong> is what a member wants to buy. Choose <strong>Supply</strong> to tell TG what you can provide.</p>
    <div className="hero-actions" style={{flexWrap:'wrap'}}>
      <Link className="button" href="/tg-networking/account">Apply to join</Link>
      <Link className="secondary-button" href="/tg-networking/account?mode=login">Member sign in</Link>
    </div>
    <p style={{fontSize:14,marginTop:24}}>Shared by invitation or activation email. Anyone with this link can watch. Member accounts still require TG approval.</p>
  </div>;
}
