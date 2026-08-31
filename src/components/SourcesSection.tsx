import { useTranslations, useMessages } from 'next-intl';

type Source = { name: string; url: string };

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items = (messages?.sources?.items || []) as Source[];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('note')}
        </p>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
