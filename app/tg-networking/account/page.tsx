import NetworkBrand from '../../components/NetworkBrand';
import type {Metadata} from 'next';
import SupplierPortal from '../../components/SupplierPortal';
export const metadata:Metadata={title:'Supplier account | TG Networking',robots:{index:false,follow:false}};
export default function AccountPage(){return <div className="shell quote-page supplier-portal"><h1 aria-label="TG Networking"><NetworkBrand /></h1><SupplierPortal /></div>;}
