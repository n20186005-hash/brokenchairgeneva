export const siteConfig = {
  baseUrl: 'https://brokenchairgeneva.com',
  siteName: 'Broken Chair Geneva',
  brandName: 'Broken Chair',
  mapsUrl: 'https://maps.app.goo.gl/ox5EXQDdKs4Yc7Nb7',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4909.736435512783!2d6.138844199999999!3d46.2228092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c64e410886e1d%3A0x2153760f38ad10a3!2sBroken%20Chair!5e1!3m2!1szh-CN!2s!4v1788182579238!5m2!1szh-CN!2s',
  address: {
    streetAddress: 'Place des Nations',
    addressLocality: 'Geneva',
    postalCode: '1202',
    addressRegion: 'Genève',
    addressCountry: 'CH',
  },
  geo: {
    latitude: 46.2228092,
    longitude: 6.1388442,
  },
  plusCode: '64FQ+4G Geneva, Switzerland',
  /** Content last reviewed / updated (ISO date). Keep in sync with `contentUpdated` in messages. */
  contentUpdated: '2026-08-31',
  socialImage: '/gallery/broken-chair-geneva-01.jpg',
} as const;

export type AppLocale = 'en' | 'zh';

/** BCP-47 tags used for `hreflang` and Open Graph `locale`. */
export const localeMeta: Record<AppLocale, { htmlLang: string; ogLocale: string }> = {
  en: { htmlLang: 'en', ogLocale: 'en_US' },
  zh: { htmlLang: 'zh-CN', ogLocale: 'zh_CN' },
};

/** Canonical URL + hreflang alternates for a locale-prefixed path (path starts with "/"). */
export function buildAlternates(locale: string, path = '') {
  const { baseUrl } = siteConfig;
  const suffix = path === '/' || path === '' ? '' : path;
  const languages: Record<string, string> = {};
  for (const loc of Object.keys(localeMeta) as AppLocale[]) {
    languages[loc] = `${baseUrl}/${loc}${suffix}`;
  }
  languages['x-default'] = `${baseUrl}/en${suffix}`;
  return {
    canonical: `${baseUrl}/${locale}${suffix}`,
    languages,
  };
}
