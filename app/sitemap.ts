import type { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://ara-techniek.nl", lastModified: new Date(), changeFrequency: "monthly", priority: 1 }]
}
