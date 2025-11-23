import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Preloader } from "@/components/preloader"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Your AI Transformation Partner | Xegents",
  description:
    "Your team's already doing the work. AI just does it faster and cheaper. We identify where AI creates immediate ROI, then build those systems for you.",
  keywords:
    "Xegents, Xegents AI, AI Agency, AI Automation Agency, AI Transformation Partner, AI Consulting, Operational AI",
  generator: "v0.app",
  openGraph: {
    title: "Your AI Transformation Partner | Xegents",
    description:
      "Your team's already doing the work. AI just does it faster and cheaper. We identify where AI creates immediate ROI, then build those systems for you.",
    type: "website",
    url: "https://xegents.com/",
    images: [
      {
        url: "/xegents-logo.png",
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
    images: ["/xegents-logo.png"],
  },
  icons: {
    icon: "/xegents-logo.png",
    apple: "/xegents-logo.png",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Xegents",
              url: "https://xegents.com/",
              logo: "/xegents-logo.png",
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
                logo: "/xegents-logo.png",
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
      <body className={`font-sans antialiased`}>
        <Preloader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
