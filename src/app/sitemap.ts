import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl;

  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/history-and-meaning', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/visitor-guide', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms-of-service', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookie-settings', priority: 0.2, changeFrequency: 'yearly' as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of pages) {
      const url = `${base}/${locale}${page.path}`;
      entries.push({
        url,
        lastModified: new Date(siteConfig.contentUpdated),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            ...Object.fromEntries(
              routing.locales
                .filter((l) => l !== locale)
                .map((l) => [l, `${base}/${l}${page.path}`])
            ),
            'x-default': `${base}/en${page.path}`,
          },
        },
      });
    }
  }

  return entries;
}
