import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://tdstudiosdigital.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/*.css", "/*.js", "/*.webp", "/*.jpg", "/*.png", "/*.svg"],
        disallow: [
          "/api/",
          "/clients/",
          "/signin",
          "/_next/",
          "/static/",
          "/*?*utm_*",
          "/*?*ref=*",
          "/search*",
          "/*.json$",
          "/admin*",
          "/test*",
          "/draft*",
        ],
        crawlDelay: 1,
      },
      // Allow search engines to index images and assets
      {
        userAgent: "Googlebot-Image",
        allow: ["/*.webp", "/*.jpg", "/*.png", "/*.svg"],
      },
      // Block common bot traffic that doesn't add value
      {
        userAgent: ["GPTBot", "CCBot", "anthropic-ai", "Claude-Web"],
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
