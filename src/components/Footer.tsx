import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const prefix = `/${locale}`;

  const officialLinks = t.raw('officialLinks') || {};

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                {t('brandName')}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t('brandSubtitle')}
              </p>
            </div>
            <h3 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              {t('officialResourcesTitle')}
            </h3>
            <div className="flex flex-col gap-2">
              <a href="https://www.myswitzerland.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.myswitzerland}
              </a>
              <a href="https://www.geneve.com/en" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.geneve}
              </a>
              <a href="https://www.geneve.ch/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.geneve_ch}
              </a>
              <a href="https://www.ungeneva.org/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.ungeneva}
              </a>
              <a href="https://www.hi.org/en/news/no-to-the-return-of-antipersonnel-landmines" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.hi}
              </a>
              <a href="https://www.swiss-visa.ch/ivis2/" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {officialLinks.visa}
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm mt-4 sm:mt-0">
            <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t('guidesTitle')}
            </h3>
            <a href={`${prefix}/history-and-meaning`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
              {t('guideMeaning')}
            </a>
            <a href={`${prefix}/visitor-guide`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
              {t('guideVisitor')}
            </a>
            <a href={`${prefix}/sculpture-facts`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'zh' ? '断椅雕塑详解' : 'Sculpture Facts'}
            </a>
            <a href={`${prefix}/place-des-nations-walk`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'zh' ? '万国广场步行路线' : 'Place des Nations Walk'}
            </a>
            <a href={`${prefix}/attractions/palais-des-nations`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>{locale === 'zh' ? '万国宫' : 'Palais des Nations'}</a>
            <a href={`${prefix}/attractions/red-cross-museum`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>{locale === 'zh' ? '国际红十字与红新月博物馆' : 'Red Cross Museum'}</a>
            <a href={`${prefix}/attractions/portail-des-nations`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>{locale === 'zh' ? '万国之门访客中心' : 'Portail des Nations'}</a>
            <a href={`${prefix}/privacy-policy`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
              {t('privacy')}
            </a>
            <a href={`${prefix}/terms-of-service`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
              {t('terms')}
            </a>
            <a href={`${prefix}/cookie-settings`} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
              {t('cookies')}
            </a>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <p>{t('rights')}</p>
          <p>{t('lastUpdated')}: {t('lastUpdatedValue')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('imageCopyright')}</p>
        </div>
      </div>
    </footer>
  );
}
