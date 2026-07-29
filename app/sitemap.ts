import type { MetadataRoute } from "next"

const BASE_URL = "https://xegents.com"

/* The marketing site is a single page — every former route (/services,
   /projects, /blog, …) now lives as a section on the home page. The lead
   magnet listing is the one standalone public route that remains. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/lead-magnets`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]
}
