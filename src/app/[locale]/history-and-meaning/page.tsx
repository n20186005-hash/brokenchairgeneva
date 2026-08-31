import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig, buildAlternates, localeMeta } from '@/lib/site';
import GuidePage from '@/components/GuidePage';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const { baseUrl } = siteConfig;
  const selfUrl = `${baseUrl}/${locale}/history-and-meaning`;
  const meta = messages.historyPage;

  return {
    metadataBase: new URL(baseUrl),
    title: meta.metaTitle,
    description: meta.metaDescription,
    alternates: buildAlternates(locale, '/history-and-meaning'),
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
      url: selfUrl,
      siteName: siteConfig.siteName,
      locale: localeMeta[locale as keyof typeof localeMeta]?.ogLocale || 'en_US',
      type: 'article',
      publishedTime: '1997-08-18',
      modifiedTime: siteConfig.contentUpdated,
      images: [{ url: `${baseUrl}${siteConfig.socialImage}`, width: 1200, height: 900, alt: 'Broken Chair monument on Place des Nations in Geneva' }],
    },
  };
}

export default async function HistoryMeaningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { baseUrl } = siteConfig;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/${locale}/history-and-meaning#webpage`,
        url: `${baseUrl}/${locale}/history-and-meaning`,
        name: 'What Does the Broken Chair in Geneva Represent? Symbolism & History',
        datePublished: '1997-08-18',
        dateModified: siteConfig.contentUpdated,
        isPartOf: { '@id': `${baseUrl}/#website` },
        breadcrumb: {
          '@id': `${baseUrl}/${locale}/history-and-meaning#breadcrumb`,
        },
        inLanguage: localeMeta[locale as keyof typeof localeMeta]?.htmlLang || 'en',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/${locale}/history-and-meaning#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Broken Chair Geneva', item: `${baseUrl}/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Meaning & History', item: `${baseUrl}/${locale}/history-and-meaning` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd id="history-jsonld" data={jsonLd} />
      <GuidePage ns="historyPage" />
    </>
  );
}
