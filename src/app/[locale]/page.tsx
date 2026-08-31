import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { siteConfig, buildAlternates, localeMeta } from '@/lib/site';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import InfoSection from '@/components/InfoSection';
import RouteSection from '@/components/RouteSection';
import MeaningSection from '@/components/MeaningSection';
import VisitorSection from '@/components/VisitorSection';
import PracticalInfoSection from '@/components/PracticalInfoSection';
import SourcesSection from '@/components/SourcesSection';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const { baseUrl } = siteConfig;
  const selfUrl = `${baseUrl}/${locale}`;

  return {
    alternates: buildAlternates(locale),
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: siteConfig.siteName,
      locale: localeMeta[locale as keyof typeof localeMeta]?.ogLocale || 'en_US',
      type: 'website',
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const { baseUrl, mapsUrl, address, geo, socialImage, contentUpdated } = siteConfig;

  const faqItems = (messages.faq?.items || []) as Array<{ question: string; answer: string }>;
  const touristAttraction = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${baseUrl}/${locale}#attraction`,
    name: 'Broken Chair',
    alternateName: ['Broken Chair Geneva', 'Three-legged chair of Geneva', '日内瓦断椅'],
    description:
      'Comprehensive visitor guide to the Broken Chair in Geneva: a 12-metre-high wooden sculpture on Place des Nations, symbol of the fight against anti-personnel landmines and cluster munitions.',
    url: `${baseUrl}/${locale}`,
    image: [`${baseUrl}${socialImage}`],
    isAccessibleForFree: true,
    publicAccess: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap: mapsUrl,
    sameAs: [mapsUrl, 'https://www.geneve.com/en', 'https://www.myswitzerland.com/'],
    touristType: ['Switzerland', 'Geneva', 'International District'],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free public access', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wheelchair access', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Public toilets nearby', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Public parking nearby', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Public transport access', value: true },
    ],
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Plus Code',
      value: '64FQ+4G Geneva, Switzerland',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd id="attraction-jsonld" data={touristAttraction} />
      <JsonLd id="faq-jsonld" data={faqSchema} />
      <Header />
      <main>
        <Hero />
        <Intro />
        <InfoSection />
        <MeaningSection />
        <RouteSection />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <VisitorSection />
        <PracticalInfoSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
