"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function Analytics() {
  const [isProduction, setIsProduction] = useState(false);
  useEffect(() => {
    setIsProduction(
      ["torontogadgets.com", "www.torontogadgets.com"].includes(
        window.location.hostname,
      ),
    );
  }, []);
  if (!isProduction) return null;
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-VPG7C4F0RB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-VPG7C4F0RB');`}
      </Script>
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","v6xsfx4qka");`}
      </Script>
    </>
  );
}
