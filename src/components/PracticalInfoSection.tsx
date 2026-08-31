import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

type Item = { id: string; title: string; content: string };

const iconMap: Record<string, ReactNode> = {
  toilets: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3.2" />
      <path d="M6 21v-5.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V21" />
    </svg>
  ),
  parking: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M10 16V8h2.5a2.5 2.5 0 0 1 0 5H10" />
    </svg>
  ),
  dining: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v7M7 21v-6M7 10h0M4 10h6M17 3c0 4-2 6-2 8h4c0-2-2-4-2-8M17 21v-5" />
    </svg>
  ),
  accommodation: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18h18" />
      <path d="M6 10V7h12v3" />
    </svg>
  ),
  shopping: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 7h12l1.5 13h-15L6 7Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  ),
  fuel: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14" />
      <path d="M3 20h12" />
      <path d="M15 9h2a2 2 0 0 1 2 2v4a2 2 0 0 0 4 0v-5l-2-2" />
      <path d="M9 6h2" />
    </svg>
  ),
};

export default function PracticalInfoSection() {
  const t = useTranslations('practical');
  const messages = useMessages() as any;
  const items = (messages?.practical?.items || []) as Item[];

  return (
    <section id="practical" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl p-6 flex gap-4"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'var(--bg-primary)', color: 'var(--accent)', border: '1px solid var(--border-color)' }}
              >
                {iconMap[item.id] || null}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
