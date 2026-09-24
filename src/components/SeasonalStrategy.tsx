import { useTranslations, useMessages } from 'next-intl';

type Season = { season: string; weather: string; lake: string; crowds: string; tip: string };

export default function SeasonalStrategy() {
  const t = useTranslations('seasonal');
  const messages = useMessages() as any;
  const data = messages?.seasonal || {};
  const seasons = (data.items || []) as Season[];
  const cols = data.cols || {};

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {seasons.map((s, i) => (
            <article
              key={i}
              className="rounded-xl p-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {s.season}
              </h3>
              <dl className="space-y-3 text-sm">
                <Row label={cols.weather} value={s.weather} />
                <Row label={cols.lake} value={s.lake} />
                <Row label={cols.crowds} value={s.crowds} />
                <Row label={cols.tip} value={s.tip} accent />
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex gap-3">
      <dt
        className="flex-shrink-0 w-28 font-medium"
        style={{ color: accent ? 'var(--accent)' : 'var(--text-muted)' }}
      >
        {label}
      </dt>
      <dd
        className="flex-1 leading-relaxed"
        style={{ color: accent ? 'var(--accent)' : 'var(--text-secondary)' }}
      >
        {value}
      </dd>
    </div>
  );
}
