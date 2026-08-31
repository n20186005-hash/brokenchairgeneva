import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import { siteConfig, localeMeta, buildAlternates } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import Analytics from '@/components/Analytics';

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
  const { baseUrl, siteName, socialImage, contentUpdated } = siteConfig;
  const title = messages.meta.title;
  const description = messages.meta.description;
  const selfUrl = `${baseUrl}/${locale}`;
  const ogImage = `${baseUrl}${socialImage}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      'Broken Chair',
      'Broken Chair Geneva',
      'three-legged chair Geneva',
      'giant chair Place des Nations',
      'broken chair symbol landmines',
      'Daniel Berset',
      'Place des Nations Geneva',
      'Geneva landmarks',
      '日内瓦断椅',
      '断椅',
      '日内瓦三腿椅',
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    alternates: buildAlternates(locale),
    openGraph: {
      title,
      description,
      url: selfUrl,
      siteName,
      locale: localeMeta[locale as keyof typeof localeMeta]?.ogLocale || 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 900,
          alt: 'The Broken Chair monument on Place des Nations in Geneva',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/manifest.webmanifest',
    other: {
      'dc.date': contentUpdated,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f4' },
    { media: '(prefers-color-scheme: dark)', color: '#0c1a14' },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const { baseUrl, siteName, contentUpdated } = siteConfig;
  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: `${baseUrl}/${locale}`,
        name: siteName,
        description: messages.meta.description,
        inLanguage: localeMeta[locale as keyof typeof localeMeta]?.htmlLang || 'en',
        publisher: { '@id': `${baseUrl}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: siteName,
        url: baseUrl,
        logo: `${baseUrl}/icon-512.png`,
      },
    ],
  };

  return (
    <html lang={localeMeta[locale as keyof typeof localeMeta]?.htmlLang || 'en'} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <JsonLd id="site-jsonld" data={siteJsonLd} />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
