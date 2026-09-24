import { siteConfig } from '@/lib/site';
import type { AppLocale } from '@/lib/site';

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number; // km/h
  windDirection: number; // degrees
}

export interface DailyForecast {
  date: string; // YYYY-MM-DD
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipProbability: number; // %
  uvIndex: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
}

type WmoInfo = { en: string; zh: string; icon: string };

// WMO weather interpretation codes -> localised label + glyph.
const WMO: Record<number, WmoInfo> = {
  0: { en: 'Clear sky', zh: '晴', icon: '☀️' },
  1: { en: 'Mainly clear', zh: '大致晴朗', icon: '🌤️' },
  2: { en: 'Partly cloudy', zh: '局部多云', icon: '⛅' },
  3: { en: 'Overcast', zh: '阴', icon: '☁️' },
  45: { en: 'Fog', zh: '雾', icon: '🌫️' },
  48: { en: 'Rime fog', zh: '雾凇', icon: '🌫️' },
  51: { en: 'Light drizzle', zh: '小毛毛雨', icon: '🌦️' },
  53: { en: 'Drizzle', zh: '毛毛雨', icon: '🌧️' },
  55: { en: 'Dense drizzle', zh: '浓毛毛雨', icon: '🌧️' },
  56: { en: 'Freezing drizzle', zh: '冻毛毛雨', icon: '🌧️' },
  57: { en: 'Freezing drizzle', zh: '冻毛毛雨', icon: '🌧️' },
  61: { en: 'Light rain', zh: '小雨', icon: '🌦️' },
  63: { en: 'Rain', zh: '中雨', icon: '🌧️' },
  65: { en: 'Heavy rain', zh: '大雨', icon: '🌧️' },
  66: { en: 'Freezing rain', zh: '冻雨', icon: '🌧️' },
  67: { en: 'Freezing rain', zh: '冻雨', icon: '🌧️' },
  71: { en: 'Light snow', zh: '小雪', icon: '🌨️' },
  73: { en: 'Snow', zh: '中雪', icon: '🌨️' },
  75: { en: 'Heavy snow', zh: '大雪', icon: '❄️' },
  77: { en: 'Snow grains', zh: '雪粒', icon: '🌨️' },
  80: { en: 'Rain showers', zh: '阵雨', icon: '🌦️' },
  81: { en: 'Rain showers', zh: '阵雨', icon: '🌧️' },
  82: { en: 'Violent rain showers', zh: '强阵雨', icon: '⛈️' },
  85: { en: 'Snow showers', zh: '阵雪', icon: '🌨️' },
  86: { en: 'Snow showers', zh: '强阵雪', icon: '❄️' },
  95: { en: 'Thunderstorm', zh: '雷阵雨', icon: '⛈️' },
  96: { en: 'Thunderstorm with hail', zh: '雷阵雨伴冰雹', icon: '⛈️' },
  99: { en: 'Thunderstorm with hail', zh: '雷阵雨伴冰雹', icon: '⛈️' },
};

const WMO_FALLBACK: WmoInfo = { en: 'Variable', zh: '多变', icon: '🌡️' };

export function describeWeather(code: number, locale: AppLocale): { label: string; icon: string } {
  const info = WMO[code] || WMO_FALLBACK;
  return { label: locale === 'zh' ? info.zh : info.en, icon: info.icon };
}

const SNOW_CODES = new Set([71, 73, 75, 77, 85, 86]);

export function windToBeaufort(kmh: number): number {
  if (kmh < 1) return 0;
  if (kmh < 6) return 1;
  if (kmh < 12) return 2;
  if (kmh < 20) return 3;
  if (kmh < 29) return 4;
  if (kmh < 39) return 5;
  if (kmh < 50) return 6;
  if (kmh < 62) return 7;
  if (kmh < 75) return 8;
  if (kmh < 89) return 9;
  if (kmh < 103) return 10;
  return 11;
}

export function uvLabel(uv: number, locale: AppLocale): string {
  if (uv < 3) return locale === 'zh' ? '低' : 'Low';
  if (uv < 6) return locale === 'zh' ? '中等' : 'Moderate';
  if (uv < 8) return locale === 'zh' ? '高' : 'High';
  if (uv < 11) return locale === 'zh' ? '很高' : 'Very high';
  return locale === 'zh' ? '极高' : 'Extreme';
}

const COMPASS_EN = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const COMPASS_ZH = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];

export function degToCompass(deg: number, locale: AppLocale): string {
  const idx = Math.round(deg / 45) % 8;
  return locale === 'zh' ? `${COMPASS_ZH[idx]}风` : COMPASS_EN[idx];
}

/**
 * Fetches the current conditions and 7-day outlook for the monument's coordinates.
 * The result is cached for 10 minutes via Next's data cache (set `revalidate`).
 * Returns `null` on any failure so callers can show a neutral fallback.
 */
export async function getWeather(): Promise<WeatherData | null> {
  const { latitude, longitude } = siteConfig.geo;
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max` +
    `&timezone=auto&forecast_days=7`;

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    const j = (await res.json()) as any;
    if (!j?.current || !Array.isArray(j?.daily?.time)) return null;

    const daily: DailyForecast[] = j.daily.time.map((date: string, i: number) => ({
      date,
      weatherCode: j.daily.weather_code[i],
      tempMax: j.daily.temperature_2m_max[i],
      tempMin: j.daily.temperature_2m_min[i],
      precipProbability: j.daily.precipitation_probability_max[i] ?? 0,
      uvIndex: j.daily.uv_index_max[i] ?? 0,
    }));

    return {
      current: {
        temperature: j.current.temperature_2m,
        apparentTemperature: j.current.apparent_temperature,
        humidity: j.current.relative_humidity_2m,
        precipitation: j.current.precipitation,
        weatherCode: j.current.weather_code,
        windSpeed: j.current.wind_speed_10m,
        windDirection: j.current.wind_direction_10m,
      },
      daily,
    };
  } catch {
    return null;
  }
}

export interface AdviceResult {
  /** What to wear. */
  outfit: string[];
  /** How to plan the visit (outdoor / indoor / timing). */
  plan: string[];
  /** What to bring. */
  items: string[];
  /** Condition-derived safety notices — only populated when conditions are severe. */
  risk: string[];
}

/**
 * Derives structured, visitor-friendly advice from the live data.
 * Returns four categories; callers render only the non-empty ones, so visitors
 * only see guidance that actually applies to today's conditions.
 * No marketing or data-source notes are included.
 * Tailored to an open-air city monument (outdoor viewing, nearby museums) rather
 * than sea/mountain scenarios.
 */
export function buildAdvice(data: WeatherData, locale: AppLocale): AdviceResult {
  const L = (zh: string, en: string) => (locale === 'zh' ? zh : en);
  const c = data.current;
  const today = data.daily[0];
  const b = windToBeaufort(c.windSpeed);
  const high = today ? today.tempMax : c.temperature;
  const low = today ? today.tempMin : c.temperature;
  const diurnal = high - low;
  const apparent = c.apparentTemperature;
  const pop = today ? today.precipProbability : 0;
  const uv = today ? today.uvIndex : 0;
  const code = c.weatherCode;

  const isThunder = code === 95 || code === 96 || code === 99;
  const isHeavyRain = code === 65 || code === 66 || code === 67 || code === 82;
  const isModRain = code === 63 || code === 81;
  const isLightRain = (code >= 51 && code <= 61) || code === 80;
  const isSnow = SNOW_CODES.has(code);
  const isFog = code === 45 || code === 48;
  const isClear = code === 0 || code === 1;
  const isOvercast = code === 3;

  const outfit: string[] = [];
  const plan: string[] = [];
  const items: string[] = [];
  const risk: string[] = [];

  // ---- Precipitation ----
  if (isThunder) {
    risk.push(L('⚠️ 有雷阵雨，谨防雷电，避免在树下或空旷处停留，行程尽量安排在室内。', '⚠️ Thunderstorms possible — avoid sheltering under trees or standing in open areas; keep plans indoors.'));
    plan.push(L('户外参观体验较差，建议优先参观周边博物馆等室内场馆。', 'Outdoor viewing is poor — prefer nearby indoor venues such as museums.'));
    items.push(L('雨衣（风大时比长柄伞更稳妥）。', 'A raincoat (more reliable than an umbrella when windy).'));
  } else if (isHeavyRain) {
    risk.push(L('⚠️ 降雨较强，避开低洼与积水路段，注意路面湿滑。', '⚠️ Heavy rain — avoid low-lying or flooded spots and watch for slippery pavements.'));
    plan.push(L('不建议长时间户外停留，可先参观周边博物馆，等雨势减弱再出来拍照。', 'Avoid long outdoor stays; visit nearby museums first and photograph after the rain eases.'));
    items.push(L('雨衣（不建议长柄伞，风大易翻折）。', 'A raincoat (avoid long umbrellas — wind can flip them).'));
  } else if (isModRain) {
    outfit.push(L('有中雨，建议穿防水外套或防滑鞋。', 'Moderate rain — wear a waterproof jacket or grippy shoes.'));
    plan.push(L('露天参观体验一般，可穿插周边室内景点。', 'Open-air viewing is so-so; weave in nearby indoor spots.'));
    items.push(L('折叠伞或雨衣。', 'A foldable umbrella or raincoat.'));
  } else if (isLightRain) {
    outfit.push(L('有小雨，穿防滑鞋并留意脚下。', 'Light rain — wear grippy shoes and mind your step.'));
    items.push(L('折叠伞。', 'A compact umbrella.'));
  } else if (isSnow) {
    outfit.push(L('有降雪，穿防滑保暖的鞋子。', 'Snowfall — wear warm, non-slip footwear.'));
    plan.push(L('地面可能湿滑，行走与拍照注意安全。', 'Pavements may be slippery — mind your step and camera.'));
    items.push(L('保暖手套、围巾。', 'Warm gloves and a scarf.'));
  } else if (pop >= 60) {
    outfit.push(L('降水概率较高，建议穿易干衣物并随身携带雨具。', 'High chance of rain — wear quick-dry clothing and keep rain gear handy.'));
    plan.push(L('若遇降雨，可优先安排周边博物馆等室内行程。', 'If it rains, prioritise indoor plans like nearby museums.'));
    items.push(L('雨伞或雨衣。', 'An umbrella or raincoat.'));
  }

  // ---- Heat & UV ----
  if (high >= 32 || apparent >= 32) {
    outfit.push(L('气温偏高，穿轻薄透气衣物，尽量避开正午烈日。', 'It is hot — wear light, breathable clothing and avoid midday sun.'));
    plan.push(L('缩短连续户外停留时间，多进室内或阴凉处休息。', 'Shorten continuous time outdoors; rest in shade or indoors.'));
    items.push(L('防晒霜、墨镜、充足饮用水。', 'Sunscreen, sunglasses and plenty of water.'));
  } else if (uv >= 5) {
    items.push(L('防晒霜、墨镜、遮阳帽。', 'Sunscreen, sunglasses and a sun hat.'));
  }
  if (isClear && high < 32 && uv < 5 && pop < 60) {
    plan.push(L('天气晴好，非常适合户外参观与拍照。', 'Clear skies — ideal for outdoor viewing and photos.'));
    items.push(L('记得防晒。', 'Remember sun protection.'));
  }
  if (isOvercast && pop < 60) {
    plan.push(L('光线柔和，很适合拍照，也无暴晒，适合长时间户外漫步。', 'Soft light is great for photos and there is no harsh sun — good for longer walks.'));
  }

  // ---- Cold ----
  if (diurnal > 8) {
    outfit.push(L('昼夜温差较大，建议备一件可增减的外套。', 'Large day-night temperature swing — bring a layer you can add or remove.'));
  }
  if (high <= 10 || apparent <= 10) {
    outfit.push(L('气温偏低，注意防寒保暖。', 'It is cold — dress warmly.'));
    items.push(L('厚外套、围巾。', 'A thick coat and scarf.'));
  } else if (apparent <= 5) {
    outfit.push(L('体感较冷，请穿保暖外套。', 'It feels cold — wear a warm coat.'));
  }

  // ---- Wind ----
  if (b >= 7) {
    risk.push(L('⚠️ 风力强劲，远离广告牌与临时搭建物，注意行走安全。', '⚠️ Strong wind — stay clear of signs or scaffolding and mind your footing.'));
    plan.push(L('开阔广场风感明显，拍照与参观时注意固定随身物品。', 'The open square feels windy — secure your belongings when viewing or photographing.'));
  } else if (b >= 5) {
    outfit.push(L('风力偏大，帽子容易被吹落。', 'Breezy — hats can blow away.'));
    plan.push(L('广场较为开阔，注意固定帽子与轻便物品。', 'The square is open — secure hats and light items.'));
  }

  // ---- Fog ----
  if (isFog) {
    risk.push(L('⚠️ 有雾，能见度较差，观景与拍照效果受限。', '⚠️ Foggy — visibility is poor, limiting views and photos.'));
  }

  // ---- Fallback when nothing triggered ----
  if (outfit.length === 0 && plan.length === 0 && items.length === 0 && risk.length === 0) {
    plan.push(L('天气平稳，适合正常参观，随身带一件薄外套以应对变化即可。', 'Conditions are calm — a normal visit works; a light layer covers any change.'));
  }

  const dedupe = (a: string[]) => Array.from(new Set(a));
  return { outfit: dedupe(outfit), plan: dedupe(plan), items: dedupe(items), risk: dedupe(risk) };
}
