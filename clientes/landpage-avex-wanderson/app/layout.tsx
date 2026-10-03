import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA4_ID = ""; // Google Analytics 4
const META_PIXEL_ID = ""; // Meta Ads Pixel

const siteUrl = "https://landpage-avex-wanderson.wandersonpaixaomkt.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AVEX Ads | Demanda com previsibilidade",
  description:
    "Estruture marketing, anúncios e processo comercial para transformar visibilidade em vendas reais.",
  icons: {
    icon: "/assets/brand/x-mark.png",
    shortcut: "/assets/brand/x-mark.png",
  },
  openGraph: {
    title: "AVEX Ads | Demanda com previsibilidade",
    description:
      "Da atração ao fechamento, a AVEX organiza marketing, anúncios e vendas para gerar demanda previsível.",
    type: "website",
    url: siteUrl,
    locale: "pt_BR",
    siteName: "AVEX Ads",
  },
  twitter: {
    card: "summary",
    title: "AVEX Ads | Demanda com previsibilidade",
    description:
      "Da atração ao fechamento, a AVEX organiza marketing, anúncios e vendas para gerar demanda previsível.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AVEX Ads",
  url: siteUrl,
  logo: `${siteUrl}/assets/brand/logo-inverted.png`,
  sameAs: ["https://www.instagram.com/avex.ads/"],
  description:
    "Agência que estrutura marketing, anúncios e processo comercial para gerar demanda previsível.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "Portuguese",
    // ⚠️ manter em sincronia com o número usado no botão de WhatsApp
    telephone: "+55-94-98199-2291",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}

        {GA4_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');
              `}
            </Script>
          </>
        ) : null}

        {META_PIXEL_ID ? (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
