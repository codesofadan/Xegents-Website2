import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects-data"
import { posts } from "@/lib/blog-data"

const BASE_URL = "https://xegents.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticPages, ...projectPages, ...blogPages]
}
