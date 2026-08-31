import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/i18n/routing';

type Block = { id: string; title: string; content: string };

export default function VisitorSection() {
  const t = useTranslations('visitor');
  const messages = useMessages() as any;
  const blocks = (messages?.visitor?.blocks || []) as Block[];

  return (
    <section id="visitor" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('lead')}
        </p>

        <div className="space-y-6 mb-10">
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

        <Link
          href="/visitor-guide"
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
