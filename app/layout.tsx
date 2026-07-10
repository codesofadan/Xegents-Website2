import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Bricolage_Grotesque } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const bricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL("https://xegents.com"),
  title: "Your AI Transformation Partner | Xegents",
  description:
    "Your team's already doing the work. AI just does it faster and cheaper. We identify where AI creates immediate ROI, then build those systems for you.",
  keywords:
    "Xegents, Xegents AI, AI Agency, AI Automation Agency, AI Transformation Partner, AI Consulting, Operational AI",
  openGraph: {
    title: "Your AI Transformation Partner | Xegents",
    description:
      "Your team's already doing the work. AI just does it faster and cheaper. We identify where AI creates immediate ROI, then build those systems for you.",
    type: "website",
    url: "https://xegents.com/",
    images: [
      {
        url: "/icon.jpg",
        width: 1200,
        height: 630,
        alt: "Xegents Logo",
      },
    ],
    siteName: "Xegents",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your AI Transformation Partner | Xegents",
    description:
      "Your team's already doing the work. AI just does it faster and cheaper. We identify where AI creates immediate ROI, then build those systems for you.",
    images: ["/icon.jpg"],
  },
  icons: {
    icon: "icon.jpg",
    apple: "icon.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Zain Saeed", url: "https://www.instagram.com/zainsaeeed/" }],
  creator: "Zain Saeed",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1D54X5R52E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1D54X5R52E');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Xegents",
              url: "https://xegents.com/",
              logo: "https://xegents.com/icon.jpg",
              description:
                "We help companies identify high-ROI AI opportunities, then build AI systems that save time, cut costs, and increase output.",
              email: "business.zainsaeed@gmail.com",
              telephone: "+92 308 804 0606",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                telephone: "+92 308 804 0606",
                email: "business.zainsaeed@gmail.com",
                areaServed: "Worldwide",
                availableLanguage: ["English", "Urdu"],
              },
              sameAs: [
                "https://www.youtube.com/@zainsaeeed",
                "https://www.instagram.com/zainsaeeed/",
                "https://www.facebook.com/zainsaeeeed/",
                "https://www.linkedin.com/in/zainsaeeed/",
              ],
              founder: {
                "@type": "Person",
                name: "Zain Saeed",
                sameAs: [
                  "https://www.youtube.com/@zainsaeeed",
                  "https://www.instagram.com/zainsaeeed/",
                  "https://www.facebook.com/zainsaeeeed/",
                  "https://www.linkedin.com/in/zainsaeeed/",
                ],
              },
              brand: {
                "@type": "Brand",
                name: "Xegents",
                logo: "https://xegents.com/icon.jpg",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Xegents",
              url: "https://xegents.com/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://xegents.com/?s={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${bricolageGrotesque.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
