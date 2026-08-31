import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/i18n/routing';
import Header from './Header';
import Footer from './Footer';

type Props = {
  /** i18n namespace for this guide page */
  ns: 'historyPage' | 'visitorPage';
};

type Section = { heading: string; paragraphs: string[] };
type TimelineItem = { year: string; title: string; content: string };
type RelatedLink = { label: string; href: string };

/** Shared layout used by the /history-and-meaning and /visitor-guide subpages. */
export default function GuidePage({ ns }: Props) {
  const t = useTranslations(ns);
  const ht = useTranslations('header');
  const messages = useMessages() as any;
  const data = messages?.[ns] || {};
  const sections = (data.sections || []) as Section[];
  const timeline = (data.timeline || []) as TimelineItem[];
  const relatedLinks = (data.relatedLinks || []) as RelatedLink[];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {ht('backToHome')}
          </Link>

          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t('title')}
          </h1>
          {t.has('subtitle') && (
            <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
              {t('subtitle')}
            </p>
          )}
          <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
            {t('lastUpdatedLabel')} · {t('lastUpdated')}
          </p>
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

          {t.has('intro') && (
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
              {t('intro')}
            </p>
          )}

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* Timeline */}
          {timeline.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
                {t('timelineTitle')}
              </h2>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5" style={{ background: 'var(--border-color)' }} />
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <div key={i} className="relative flex gap-4 pl-4">
                      <div
                        className="absolute left-3 -translate-x-1/2 w-3 h-3 rounded-full"
                        style={{ background: 'var(--accent)', top: '0.4rem' }}
                      />
                      <div className="flex-1 rounded-xl p-5" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                        <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--accent)' }}>
                          {item.year}
                        </p>
                        <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Related / cross links */}
          {relatedLinks.length > 0 && (
            <div className="mt-14 p-6 rounded-xl" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {t('relatedTitle')}
              </h2>
              <div className="flex flex-col gap-3">
                {relatedLinks.map((link, i) => (
                  <Link key={i} href={link.href as any} className="text-sm font-medium hover:underline" style={{ color: 'var(--accent)' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--accent)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {ht('backToHome')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
