import { useTranslations, useMessages } from 'next-intl';
import { siteConfig } from '@/lib/site';

type Landmark = { title: string; description: string };

/**
 * "Landmarks & Attractions Around Broken Chair Geneva" section.
 * Renders template §3 H2 node + §4.3 nearby semantic cluster, binding the
 * entity to the two core surrounding landmarks.
 */
export default function NearbySection() {
  const t = useTranslations('nearby');
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
