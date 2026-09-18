import Image from "next/image";

export default function Brand() {
  return (
    <span className="brand">
      <Image className="brand-symbol" src="/brand/tg-symbol.png" width={663} height={522} alt="" />
      <span>
        <strong>Toronto Gadgets</strong>
        <small>B2B Technology Sourcing</small>
      </span>
    </span>
  );
}
