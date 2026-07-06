import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/seoportal",
      },
    ],
    sitemap: "https://xegents.com/sitemap.xml",
  }
}
