import type {Metadata} from 'next';
import SupplierPortal from '../../components/SupplierPortal';
export const metadata:Metadata={title:'Supplier account | TG Networking',robots:{index:false,follow:false}};
export default function AccountPage(){return <main className="shell quote-page supplier-portal"><h1><span className="tg-gold">TG</span> Networking</h1><SupplierPortal /></main>;}
