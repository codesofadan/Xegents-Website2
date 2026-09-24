import type { MetadataRoute } from "next"

const BASE_URL = "https://xegents.com"

/* The marketing site is a single page — every former route (/services,
   /projects, /blog, …) now lives as a section on the home page, so the home
   page is the only public route worth listing. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ]
}
