import fs from 'fs';
const s = fs.readFileSync('.next/server/app/zh.html', 'utf8');
const checks = ['周边地标', '国际红十字', '万国宫', '断椅（日内瓦）周边', 'aggregateRating', '4.5 (9,512)'];
for (const c of checks) console.log((s.includes(c) ? 'OK   ' : 'MISS ') + c);
