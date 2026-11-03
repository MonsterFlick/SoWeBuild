import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/workData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sowebuild.in";
  const now = new Date();

  const caseStudyUrls: MetadataRoute.Sitemap = Object.keys(CASE_STUDIES).map(
    (slug) => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...caseStudyUrls,
    {
      url: `${baseUrl}/brand-guidelines`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}

