import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { extraGuides, type ExtraGuideSlug } from '@/lib/extraGuides';
import { buildAlternates, localeMeta, siteConfig } from '@/lib/site';

const slugs = Object.keys(extraGuides) as ExtraGuideSlug[];

export function generateStaticParams() {
  return (['en', 'zh'] as const).flatMap((locale) => slugs.map((guide) => ({ locale, guide })));
}

function getGuide(locale: string, guide: string) {
  if ((locale !== 'en' && locale !== 'zh') || !slugs.includes(guide as ExtraGuideSlug)) return null;
  return extraGuides[guide as ExtraGuideSlug][locale];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; guide: string }> }): Promise<Metadata> {
  const { locale, guide } = await params;
  const content = getGuide(locale, guide);
  if (!content) return {};
  const path = `/${guide}`;
  return {
    title: content.title,
    description: content.description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: content.title,
      description: content.description,
      url: `${siteConfig.baseUrl}/${locale}${path}`,
      type: 'article',
      images: [{ url: `${siteConfig.baseUrl}${siteConfig.socialImage}`, width: 1200, height: 900 }],
    },
  };
}

export default async function ExtraGuidePage({ params }: { params: Promise<{ locale: string; guide: string }> }) {
  const { locale, guide } = await params;
  const content = getGuide(locale, guide);
  if (!content) notFound();
  setRequestLocale(locale);
  const zh = locale === 'zh';
  const path = `/${locale}/${guide}`;
  const otherSlug = guide === 'sculpture-facts' ? 'place-des-nations-walk' : 'sculpture-facts';
  const other = extraGuides[otherSlug][locale as 'en' | 'zh'];
  const sources = [
    { title: zh ? '日内瓦旅游局：断椅' : 'Geneva Tourism: Broken Chair', url: 'https://www.geneve.com/en/attractions/detail/broken-chair' },
    { title: zh ? '联合国日内瓦办事处：参观须知' : 'UN Geneva: Visiting the Palais des Nations', url: 'https://www.ungeneva.org/en/visit' },
    { title: zh ? '国际残障组织：机构历史' : 'Humanity & Inclusion: Our history', url: 'https://www.hi.org/en/history' },
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${siteConfig.baseUrl}${path}#article`,
        headline: content.title,
        description: content.description,
        image: `${siteConfig.baseUrl}${siteConfig.socialImage}`,
        dateModified: '2026-11-19',
        inLanguage: localeMeta[locale as 'en' | 'zh'].htmlLang,
        mainEntityOfPage: `${siteConfig.baseUrl}${path}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Broken Chair', item: `${siteConfig.baseUrl}/${locale}` },
          { '@type': 'ListItem', position: 2, name: content.title, item: `${siteConfig.baseUrl}${path}` },
        ],
      },
    ],
  };
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <JsonLd id={`guide-${guide}-jsonld`} data={jsonLd} />
      <Header />
      <main className="pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <nav className="text-sm mb-8" aria-label="Breadcrumb">
            <a className="hover:underline" style={{ color: 'var(--accent)' }} href={`/${locale}`}>{zh ? '首页' : 'Home'}</a>
            <span className="mx-2">/</span>{content.title}
          </nav>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4">{content.title}</h1>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>{content.subtitle}</p>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-8">
            <Image src="/gallery/broken-chair-geneva-01.jpg" alt={zh ? '日内瓦万国广场断椅实景' : 'Broken Chair at Place des Nations, Geneva'} fill priority sizes="(max-width: 768px) 100vw, 896px" className="object-cover" />
          </div>
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>{content.intro}</p>
          <section className="rounded-2xl p-6 sm:p-8 mb-12" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <h2 className="font-display text-2xl font-semibold mb-5">{zh ? '基本信息' : 'At a glance'}</h2>
            <dl className="grid sm:grid-cols-2 gap-5">{content.quickFacts.map((fact) => <div key={fact.label}><dt className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>{fact.label}</dt><dd className="leading-relaxed">{fact.value}</dd></div>)}</dl>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 font-medium hover:underline" style={{ color: 'var(--accent)' }}>{zh ? '查看断椅 Google 地图位置' : 'Open Broken Chair on Google Maps'} ↗</a>
          </section>
          <div className="space-y-12">{content.sections.map((section) => <section key={section.title}><h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">{section.title}</h2>{section.paragraphs.map((p) => <p key={p} className="leading-8 mb-4" style={{ color: 'var(--text-secondary)' }}>{p}</p>)}</section>)}</div>
          <section className="mt-14"><h2 className="font-display text-2xl sm:text-3xl font-semibold mb-6">{zh ? '建议路线与观察步骤' : 'Suggested route and observation stops'}</h2><ol className="space-y-5">{content.steps.map((step, i) => <li key={step.title} className="rounded-xl p-5" style={{ background: 'var(--bg-tertiary)' }}><h3 className="font-semibold text-lg mb-2">{i + 1}. {step.title}</h3><p style={{ color: 'var(--text-secondary)' }}>{step.description}</p>{step.map && <a className="inline-block mt-3 text-sm hover:underline" href={step.map} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{zh ? '地点导航' : 'Map for this stop'} ↗</a>}</li>)}</ol></section>
          <section className="mt-14"><h2 className="font-display text-2xl sm:text-3xl font-semibold mb-6">{zh ? '常见问题' : 'Frequently asked questions'}</h2>{content.faqs.map((item) => <div className="mb-6" key={item.question}><h3 className="font-semibold text-lg mb-2">{item.question}</h3><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{item.answer}</p></div>)}</section>
          <section className="mt-14 p-6 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}><h2 className="font-display text-xl font-semibold mb-4">{zh ? '继续探索' : 'Continue exploring'}</h2><div className="flex flex-col gap-3">{[
            { href: `/${locale}/${otherSlug}`, label: other.title },
            { href: `/${locale}/history-and-meaning`, label: zh ? '断椅的历史与意义' : 'Full history and meaning' },
            { href: `/${locale}/visitor-guide`, label: zh ? '断椅实用游览指南' : 'Practical visitor guide' },
            { href: `/${locale}`, label: zh ? '返回断椅首页' : 'Back to Broken Chair home' },
          ].map((link) => <a key={link.href} href={link.href} className="font-medium hover:underline" style={{ color: 'var(--accent)' }}>{link.label}</a>)}</div></section>
          <section className="mt-12"><h2 className="font-display text-xl font-semibold mb-3">{zh ? '资料来源' : 'Sources'}</h2><p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{zh ? '资料核对：2026年11月19日。交通、预约及场地安排以机构最新公告为准。' : 'Sources checked 19 November 2026. Verify current transit, bookings and site access with the relevant operators.'}</p><ul className="space-y-2">{sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>{s.title} ↗</a></li>)}</ul></section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
