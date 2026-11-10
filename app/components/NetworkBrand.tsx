import Image from 'next/image';

/** Use the original artwork; never recreate the TG monogram as text. */
export default function NetworkBrand() {
  return <span className="network-brand"><Image src="/brand/tg-symbol.png" width={663} height={522} alt="TG" /><span>Networking</span></span>;
}
