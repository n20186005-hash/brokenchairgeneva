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
  const selfUrl = `${baseUrl}/${locale}/visitor-guide`;
  const meta = messages.visitorPage;

  return {
    metadataBase: new URL(baseUrl),
    title: meta.metaTitle,
    description: meta.metaDescription,
    alternates: buildAlternates(locale, '/visitor-guide'),
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
      url: selfUrl,
      siteName: siteConfig.siteName,
      locale: localeMeta[locale as keyof typeof localeMeta]?.ogLocale || 'en_US',
      type: 'website',
      images: [{ url: `${baseUrl}${siteConfig.socialImage}`, width: 1200, height: 900, alt: 'Broken Chair monument on Place des Nations in Geneva' }],
    },
  };
}

export default async function VisitorGuidePage({
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
        '@id': `${baseUrl}/${locale}/visitor-guide#webpage`,
        url: `${baseUrl}/${locale}/visitor-guide`,
        name: 'Broken Chair Geneva Visitor Guide: Location, Transport & Photo Tips',
        datePublished: siteConfig.contentUpdated,
        dateModified: siteConfig.contentUpdated,
        isPartOf: { '@id': `${baseUrl}/#website` },
        breadcrumb: {
          '@id': `${baseUrl}/${locale}/visitor-guide#breadcrumb`,
        },
        inLanguage: localeMeta[locale as keyof typeof localeMeta]?.htmlLang || 'en',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/${locale}/visitor-guide#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Broken Chair Geneva', item: `${baseUrl}/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Visitor Guide', item: `${baseUrl}/${locale}/visitor-guide` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd id="visitor-jsonld" data={jsonLd} />
      <GuidePage ns="visitorPage" />
    </>
  );
}
