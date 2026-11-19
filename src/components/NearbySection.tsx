import { useTranslations, useMessages, useLocale } from 'next-intl';
import { siteConfig } from '@/lib/site';
import Image from 'next/image';
import { nearbyAttractions } from '@/lib/nearbyAttractions';

type Landmark = { title: string; description: string };

/**
 * "Landmarks & Attractions Around Broken Chair Geneva" section.
 * Renders template §3 H2 node + §4.3 nearby semantic cluster, binding the
 * entity to the two core surrounding landmarks.
 */
export default function NearbySection() {
  const t = useTranslations('nearby');
  const locale = useLocale();
  const zh = locale === 'zh';
  const messages = useMessages() as any;
  const data = messages?.nearby || {};
  const mapsLink = messages?.hero?.mapsLink || siteConfig.mapsUrl;

  const landmarks: Landmark[] = [
    { title: data.landmark1Title, description: data.landmark1Desc },
    { title: data.landmark2Title, description: data.landmark2Desc },
  ].filter((l) => l.title && l.description) as Landmark[];

  return (
    <section id="nearby" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* §4.3 Nearby semantic cluster paragraph */}
        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('lead')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landmarks.map((landmark, i) => (
            <div
              key={i}
              className="rounded-xl p-6 sm:p-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {landmark.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {landmark.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href={`/${locale}/sculpture-facts`} className="rounded-xl p-5 hover:underline" style={{ border: '1px solid var(--border-color)', color: 'var(--accent)' }}>
            <span className="block font-semibold">{zh ? '断椅雕塑详解：作者、尺寸与象征' : 'Broken Chair sculpture: artist, size & symbolism'}</span>
            <span className="block mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{zh ? '从断裂的椅腿读懂作品设计' : 'Explore the artwork’s construction and meaning'}</span>
          </a>
          <a href={`/${locale}/place-des-nations-walk`} className="rounded-xl p-5 hover:underline" style={{ border: '1px solid var(--border-color)', color: 'var(--accent)' }}>
            <span className="block font-semibold">{zh ? '万国广场周边步行路线' : 'Place des Nations self-guided walk'}</span>
            <span className="block mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{zh ? '断椅、万国宫与红十字博物馆' : 'Broken Chair, UN buildings and Red Cross Museum'}</span>
          </a>
        </div>

        <h3 className="font-display text-2xl font-semibold mt-12 mb-5" style={{ color: 'var(--text-primary)' }}>
          {zh ? '更多周边景点专页' : 'Explore nearby landmarks'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {Object.values(nearbyAttractions).map((place) => (
            <a key={place.slug} href={`/${locale}/attractions/${place.slug}`} className="block overflow-hidden rounded-xl hover:underline" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <div className="relative aspect-[4/3]"><Image src={place.image} alt={place[zh ? 'zh' : 'en'].name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" /></div>
              <div className="p-4"><h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{place[zh ? 'zh' : 'en'].name}</h4><p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{place[zh ? 'zh' : 'en'].tagline}</p></div>
            </a>
          ))}
        </div>

        {/* Authoritative outbound link to official tourism portal (template §5) */}
        <p className="mt-10 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          <a
            href={siteConfig.govtTourismUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            {t('viewOnMap')}
          </a>
          {' · '}
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            Switzerland Tourism
          </a>
        </p>
      </div>
    </section>
  );
}
