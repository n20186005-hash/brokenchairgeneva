import { getTranslations } from 'next-intl/server';
import type { AppLocale } from '@/lib/site';
import { getWeather, describeWeather, windToBeaufort, uvLabel, degToCompass, buildAdvice } from '@/lib/weather';

export default async function WeatherSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'weather' });
  const loc = locale as AppLocale;
  const data = await getWeather();
  const isZh = loc === 'zh';

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {!data ? (
          <div
            className="rounded-xl p-6"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('fallback')}</p>
          </div>
        ) : (
          <>
            {/* Current conditions */}
            <div
              className="rounded-xl p-6 mb-6 flex flex-col sm:flex-row gap-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-4">
                <span style={{ fontSize: '3rem' }}>{describeWeather(data.current.weatherCode, loc).icon}</span>
                <div>
                  <div className="font-display text-4xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(data.current.temperature)}°
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {describeWeather(data.current.weatherCode, loc).label}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                <Metric label={t('feelsLike')} value={`${Math.round(data.current.apparentTemperature)}°`} />
                <Metric label={t('humidity')} value={`${Math.round(data.current.humidity)}%`} />
                <Metric
                  label={t('wind')}
                  value={`${Math.round(data.current.windSpeed)} km/h ${degToCompass(data.current.windDirection, loc)} (${windToBeaufort(data.current.windSpeed)})`}
                />
                <Metric label={t('precip')} value={`${data.current.precipitation} mm`} />
              </div>
            </div>

            {/* Smart visitor advice — only the items that apply today are shown */}
            {(() => {
              const advice = buildAdvice(data, loc);
              return (
                <div className="space-y-4 mb-8">
                  {advice.risk.length > 0 && (
                    <div
                      className="rounded-xl p-5"
                      style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.4)' }}
                    >
                      <div className="font-semibold mb-2" style={{ color: '#dc2626' }}>{t('riskTitle')}</div>
                      <ul className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {advice.risk.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <AdviceBlock title={t('outfitTitle')} items={advice.outfit} />
                  <AdviceBlock title={t('planTitle')} items={advice.plan} />
                  <AdviceBlock title={t('itemsTitle')} items={advice.items} />
                </div>
              );
            })()}

            {/* 7-day forecast */}
            <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('forecast')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {data.daily.map((d, i) => {
                const dt = new Date(`${d.date}T00:00:00`);
                const weekday = new Intl.DateTimeFormat(isZh ? 'zh-CN' : 'en-US', { weekday: 'short' }).format(dt);
                const dayLabel = i === 0 ? (isZh ? '今天' : 'Today') : weekday;
                return (
                  <div
                    key={i}
                    className="rounded-lg p-3 text-center"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{dayLabel}</div>
                    <div style={{ fontSize: '1.5rem' }}>{describeWeather(d.weatherCode, loc).icon}</div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(d.tempMax)}° / {Math.round(d.tempMin)}°
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {t('pop')} {d.precipProbability}%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {t('uv')} {uvLabel(d.uvIndex, loc)}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</div>
    </div>
  );
}

function AdviceBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
    >
      <div className="font-semibold mb-2" style={{ color: 'var(--accent)' }}>{title}</div>
      <ul className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
        {items.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
