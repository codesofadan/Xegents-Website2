import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/seoportal", "/admin", "/api/"],
      },
    ],
    sitemap: "https://xegents.com/sitemap.xml",
  }
}
