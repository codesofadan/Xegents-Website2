import type { MetadataRoute } from "next"

const BASE_URL = "https://xegents.com"

/* The site is a single page. Every former route — /services, /projects,
   /blog, /contact, /clients, /lead-magnets, /team — now lives as a section or
   an in-place reveal panel on the home page, so the sitemap lists one URL.
   Advertising the old paths here would hand Google a list of 404s. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ]
}
