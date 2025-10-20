import { MetadataRoute } from "next"
import { clients } from "@/lib/clients-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tdstudiosdigital.com"

  const routes = [
    { path: "", priority: 1.0, changefreq: "weekly" },
    { path: "/work", priority: 0.9, changefreq: "weekly" },
    { path: "/web", priority: 0.9, changefreq: "monthly" },
    { path: "/dev", priority: 0.9, changefreq: "monthly" },
    { path: "/social", priority: 0.9, changefreq: "monthly" },
    { path: "/design", priority: 0.9, changefreq: "monthly" },
    { path: "/process", priority: 0.8, changefreq: "monthly" },
    { path: "/resources", priority: 0.7, changefreq: "weekly" },
    { path: "/resources/premade-designs", priority: 0.7, changefreq: "weekly" },
    { path: "/services", priority: 0.9, changefreq: "monthly" },
    { path: "/faq", priority: 0.7, changefreq: "monthly" },
    { path: "/contact", priority: 0.8, changefreq: "monthly" },
    { path: "/book", priority: 0.8, changefreq: "monthly" },
    { path: "/support", priority: 0.6, changefreq: "monthly" },
    { path: "/legal", priority: 0.5, changefreq: "yearly" },
  ]

  // Generate project pages from clients data
  const projectPages = clients.map((client) => ({
    url: `${baseUrl}/work/${client.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const staticPages = routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changefreq as "yearly" | "monthly" | "weekly",
    priority: r.priority,
  }))

  return [...staticPages, ...projectPages]
}
