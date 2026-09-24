import { useTranslations, useMessages } from 'next-intl';

type Route = { title: string; desc: string };

export default function Itineraries() {
  const t = useTranslations('itineraries');
  const messages = useMessages() as any;
  const data = messages?.itineraries || {};
  const audiences = (data.audiences || []) as Route[];
  const general = (data.general || []) as Route[];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('audiencesTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {audiences.map((r, i) => (
            <RouteCard key={i} title={r.title} desc={r.desc} />
          ))}
        </div>

        <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('generalTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {general.map((r, i) => (
            <RouteCard key={i} title={r.title} desc={r.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteCard({ title, desc }: { title: string; desc: string }) {
  return (
    <article
      className="rounded-xl p-6"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <h4 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {desc}
      </p>
    </article>
  );
}
