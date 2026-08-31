import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/i18n/routing';

type Block = { id: string; title: string; content: string };
type Fact = { label: string; value: string };

export default function MeaningSection() {
  const t = useTranslations('meaning');
  const messages = useMessages() as any;
  const blocks = (messages?.meaning?.blocks || []) as Block[];
  const facts = (messages?.meaning?.facts || []) as Fact[];

  return (
    <section id="meaning" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('lead')}
        </p>

        <Link
          href="/visitor-guide"
          className="inline-flex items-center gap-2 text-sm font-medium mb-12 hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          {t('visualLink')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>

        <div className="space-y-8 mb-12">
          {blocks.map((block) => (
            <article key={block.id} className="rounded-xl p-6 sm:p-8" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {block.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {block.content}
              </p>
            </article>
          ))}
        </div>

        <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('factsTitle')}
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-xl p-5" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <dt className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{fact.label}</dt>
              <dd className="font-medium" style={{ color: 'var(--text-primary)' }}>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <Link
          href="/history-and-meaning"
          className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          {t('readMore')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
