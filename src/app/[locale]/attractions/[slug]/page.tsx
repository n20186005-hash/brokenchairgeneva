import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { nearbyAttractions, type NearbySlug } from '@/lib/nearbyAttractions';
import { nearbyPlanning } from '@/lib/nearbyPlanning';
import { siteConfig, buildAlternates } from '@/lib/site';

const slugs = Object.keys(nearbyAttractions) as NearbySlug[];
const languages = ['en', 'zh'] as const;

export function generateStaticParams() {
  return languages.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

function lookup(locale: string, slug: string) {
  if (!languages.includes(locale as 'en' | 'zh') || !slugs.includes(slug as NearbySlug)) return null;
  const place = nearbyAttractions[slug as NearbySlug];
  return { place, content: place[locale as 'en' | 'zh'] };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const found = lookup(locale, slug);
  if (!found) return {};
  const { place, content } = found;
  const path = `/attractions/${slug}`;
  return {
    title: `${content.name} | ${locale === 'zh' ? '日内瓦景点指南' : 'Geneva Attractions Guide'}`,
    description: `${content.tagline}. ${content.intro}`.slice(0, 160),
    alternates: buildAlternates(locale, path),
    openGraph: { title: content.name, description: content.tagline, url: `${siteConfig.baseUrl}/${locale}${path}`, type: 'article', images: [{ url: `${siteConfig.baseUrl}${place.image}` }] },
  };
}

export default async function NearbyAttractionPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const found = lookup(locale, slug);
  if (!found) notFound();
  setRequestLocale(locale);
  const { place, content } = found;
  const zh = locale === 'zh';
  const planning = nearbyPlanning[place.slug][zh ? 'zh' : 'en'];
  const localizedHours = zh ? {
    'palais-des-nations': '广场公共区域可观赏外观；室内导览以联合国预约日历为准',
    'red-cross-museum': '通常周二至周日10:00–17:00；假日及闭馆日以官网为准',
    'portail-des-nations': '开放时间及活动安排请查阅访客中心最新公告',
    'musee-ariana': '周二至周日10:00–17:00，周一闭馆；节假日以官网为准',
    'geneva-botanical-garden': '每日开放：夏季08:00–19:00、冬季08:00–17:00；温室时段可能不同',
    'centre-william-rappard': '国际组织办公建筑，不对公众自由开放；导览需事先联系确认',
    'science-history-museum': '周三至周一10:00–17:00，周二闭馆；节假日可能调整',
    'perle-du-lac-park': '全年可游览公共公园步道；个别设施以现场开放规定为准',
  }[place.slug] : place.hours;
  const localizedAdmission = zh ? {
    'palais-des-nations': '从广场看外观免费；联合国导览须预约并按规定购票',
    'red-cross-museum': '博物馆需购票；最新票价及优惠以官网为准',
    'portail-des-nations': '请查询访客中心当前入场要求与活动安排',
    'musee-ariana': '常设展通常免费；部分临时展览可能收费，请核对当期票价',
    'geneva-botanical-garden': '植物园免费入园',
    'centre-william-rappard': '从公共区域欣赏外观免费；世贸组织导览须提前安排',
    'science-history-museum': '普通入场免费',
    'perle-du-lac-park': '公共湖畔公园免费；相邻博物馆及其他设施另有安排',
  }[place.slug] : place.admission;
  const url = `${siteConfig.baseUrl}/${locale}/attractions/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'TouristAttraction', '@id': `${url}#attraction`, name: content.name, description: content.intro, url, image: `${siteConfig.baseUrl}${place.image}`, address: { '@type': 'PostalAddress', streetAddress: place.address, addressLocality: 'Geneva', addressCountry: 'CH' }, hasMap: place.maps },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Broken Chair', item: `${siteConfig.baseUrl}/${locale}` }, { '@type': 'ListItem', position: 2, name: content.name, item: url }] },
    ],
  };
  const sectionHeading = 'font-display text-2xl sm:text-3xl font-semibold mb-5';
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <JsonLd id={`attraction-${slug}-jsonld`} data={jsonLd} />
      <Header />
      <main className="pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <nav aria-label={zh ? '当前位置导航' : 'Breadcrumb navigation'} className="text-sm mb-8"><a href={`/${locale}`} className="hover:underline" style={{ color: 'var(--accent)' }}>{zh ? '断椅首页' : 'Broken Chair home'}</a><span className="mx-2">/</span>{content.name}</nav>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-4">{content.name}</h1>
          <p className="text-lg mb-5" style={{ color: 'var(--text-secondary)' }}>{content.tagline}</p>
          <div className="flex flex-wrap gap-3 mb-8 text-sm"><span className="rounded-full px-4 py-2" style={{ background: 'var(--bg-tertiary)' }}>{localizedHours}</span><span className="rounded-full px-4 py-2" style={{ background: 'var(--bg-tertiary)' }}>{place.address}</span><a href="#visitor-reviews" className="rounded-full px-4 py-2 hover:underline" style={{ background: 'var(--bg-tertiary)' }}>{zh ? '查看游客评价' : 'Visitor reviews'}</a><a href={place.maps} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 font-semibold hover:underline" style={{ background: 'var(--accent)', color: '#fff' }}>{zh ? 'Google 地图导航' : 'Google Maps directions'} ↗</a></div>
          <figure className="mb-10"><div className="relative aspect-[16/9] rounded-2xl overflow-hidden"><Image src={place.image} fill sizes="(max-width: 768px) 100vw, 896px" alt={content.name} className="object-cover" priority /></div><figcaption className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{zh ? '实景照片' : 'Location photograph'} · <a href={place.imageSource} className="underline" target="_blank" rel="noopener noreferrer">{place.imageCredit}</a></figcaption></figure>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '探索景点' : 'Explore this attraction'}</h2><p className="text-lg leading-8" style={{ color: 'var(--text-secondary)' }}>{content.intro}</p><h3 className="font-display text-xl font-semibold mt-6 mb-3">{zh ? '游览建议' : 'Visit tips'}</h3><ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--text-secondary)' }}>{content.visit.slice(0, 2).map((v) => <li key={v}>{v}</li>)}</ul><h3 className="font-display text-xl font-semibold mt-6 mb-3">{zh ? '景点特色' : 'Highlights'}</h3><ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--text-secondary)' }}>{content.highlights.map((h) => <li key={h}>{h}</li>)}</ul></section>
          <section className="mb-8 rounded-2xl p-6 sm:p-8" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}><h2 className={sectionHeading}>{zh ? `关于${content.name}` : `About ${content.name}`}</h2><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{content.about}</p><p className="mt-4 text-sm font-medium">{zh ? '管理或运营主体' : 'Managing or operating body'}：{content.operator}</p></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '基本资料' : 'Basic information'}</h2><dl className="grid sm:grid-cols-2 gap-5 rounded-xl p-6" style={{ background: 'var(--bg-tertiary)' }}>{[...content.facts, [zh ? '地点地址' : 'Address', place.address], [zh ? '开放安排' : 'Opening information', localizedHours], [zh ? '门票' : 'Admission', localizedAdmission]].map(([label, value]) => <div key={label}><dt className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>{label}</dt><dd className="leading-relaxed">{value}</dd></div>)}</dl></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '开放时间' : 'Opening hours'}</h2><p className="leading-8 mb-3" style={{ color: 'var(--text-secondary)' }}>{localizedHours}</p><a href={place.official} className="font-semibold hover:underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">{zh ? '查看官方开放公告' : 'Check official opening updates'} ↗</a></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '门票价格' : 'Ticket prices'}</h2><p className="leading-8 mb-4" style={{ color: 'var(--text-secondary)' }}>{localizedAdmission}</p><a href={place.official} className="font-semibold hover:underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">{zh ? '查看当前官方票价与预约方式' : 'Current official prices and booking'} ↗</a></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '交通方式' : 'Getting there'}</h2><div className="space-y-4">{planning.transit.map((item, i) => <p key={item} className="leading-8" style={{ color: 'var(--text-secondary)' }}><span className="font-semibold mr-3" style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>{item}</p>)}</div></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '发现魅力：历史、建筑与体验' : 'History, architecture and experience'}</h2><h3 className="font-display text-xl font-semibold mb-3">{zh ? '历史背景' : 'Historical background'}</h3>{content.history.map((p) => <p key={p} className="leading-8 mb-4" style={{ color: 'var(--text-secondary)' }}>{p}</p>)}<h3 className="font-display text-xl font-semibold mt-8 mb-3">{zh ? '建筑与观察重点' : 'Architecture and what to observe'}</h3>{content.architecture.map((p) => <p key={p} className="leading-8 mb-4" style={{ color: 'var(--text-secondary)' }}>{p}</p>)}</section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '文化意义与核心体验' : 'Cultural significance and core experience'}</h2><h3 className="font-display text-xl font-semibold mb-3">{zh ? '文化背景' : 'Cultural context'}</h3><p className="leading-8 mb-6" style={{ color: 'var(--text-secondary)' }}>{planning.culture}</p><h3 className="font-display text-xl font-semibold mb-3">{zh ? '最值得体验什么' : 'What to experience'}</h3><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{planning.experience}</p></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '推荐步行路线' : 'Suggested walking route'}</h2><ol className="space-y-4">{content.route.map((step, i) => <li key={step} className="rounded-xl p-5 flex gap-4" style={{ background: 'var(--bg-tertiary)' }}><span className="font-semibold" style={{ color: 'var(--accent)' }}>{i + 1}</span><span className="leading-7">{step}</span></li>)}</ol></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '游览须知' : 'Visitor notes'}</h2><ul className="list-disc pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>{content.visit.map((p) => <li key={p} className="leading-7">{p}</li>)}</ul></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '拍照机位' : 'Photo spots'}</h2><ul className="list-disc pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>{content.photoTips.map((p) => <li key={p} className="leading-7">{p}</li>)}</ul></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '住宿与行程建议' : 'Stay and itinerary planning'}</h2><p className="leading-8 mb-4" style={{ color: 'var(--text-secondary)' }}>{planning.stay}</p><p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{zh ? '可根据行程选择日内瓦市中心或公共交通便利的住宿区域。若参观多个国际组织区景点，建议同一天安排，以减少往返交通；具体住宿价格和交通班次依实际预订日期为准。' : 'For a multi-stop visit, consider accommodation in central Geneva or along a convenient public-transit connection. Group international-district attractions into the same outing; check actual accommodation rates and transport schedules for your dates.'}</p></section>
          <section id="visitor-reviews" className="mb-12 scroll-mt-20"><h2 className={sectionHeading}>{zh ? '游客评价与实地体验' : 'Visitor reviews and on-site experience'}</h2><p className="leading-8 mb-4" style={{ color: 'var(--text-secondary)' }}>{planning.reviewFocus}</p><p className="leading-8 mb-4" style={{ color: 'var(--text-secondary)' }}>{zh ? '游客评价会随时间变化，本站暂未同步该景点的独立评分、评论数或实名评价。建议阅读 Google 地图中的最新访客反馈，留意拥挤程度、近期闭馆消息、步行体验与无障碍信息。' : 'Reviews change over time. We do not currently synchronize a verified rating, review count or individual testimonials for this specific attraction. Read recent visitor feedback on its dedicated Google Maps listing, especially notes on crowds, closures, walking conditions and accessibility.'}</p><a href={place.maps} className="font-semibold hover:underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">{zh ? `查看${content.name}的最新游客评价` : `Read recent reviews for ${content.name}`} ↗</a></section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '常见问题' : 'Frequently asked questions'}</h2>{content.faq.map(([question, answer]) => <div key={question} className="mb-6"><h3 className="font-semibold text-lg mb-2">{question}</h3><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{answer}</p></div>)}</section>
          <section className="mb-12"><h2 className={sectionHeading}>{zh ? '交通指南与地点导航' : 'Address and navigation'}</h2><p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{place.address}</p><a href={place.maps} className="font-semibold hover:underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">{zh ? '前往此景点的独立 Google 地图' : 'Open this attraction on Google Maps'} ↗</a></section>
          <section className="rounded-xl p-6 mb-10" style={{ background: 'var(--bg-tertiary)' }}><h2 className="font-display text-xl font-semibold mb-4">{zh ? '附近景点' : 'Nearby attractions'}</h2><div className="flex flex-col gap-3">{slugs.filter((s) => s !== slug).map((s) => <a key={s} href={`/${locale}/attractions/${s}`} className="hover:underline" style={{ color: 'var(--accent)' }}>{nearbyAttractions[s][locale as 'en' | 'zh'].name}</a>)}<a href={`/${locale}/place-des-nations-walk`} style={{ color: 'var(--accent)' }} className="hover:underline">{zh ? '万国广场完整步行路线' : 'Place des Nations walking route'}</a><a href={`/${locale}`} style={{ color: 'var(--accent)' }} className="hover:underline">{zh ? '返回断椅首页' : 'Return to Broken Chair'}</a></div></section>
          <section><h2 className="font-display text-xl font-semibold mb-3">{zh ? '资料来源' : 'Sources'}</h2><a className="hover:underline text-sm" style={{ color: 'var(--accent)' }} href={place.official} target="_blank" rel="noopener noreferrer">{zh ? '官方游览资料' : 'Official visitor information'} ↗</a><p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>{zh ? '资料核对日期：2026年11月19日' : 'Information checked: 19 November 2026'}</p></section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
