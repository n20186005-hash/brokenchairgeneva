import fs from 'fs';
const s = fs.readFileSync('.next/server/app/zh.html', 'utf8');
const checks = [
  'aggregateRating',
  'reviewCount',
  '9,512',
  'Landmarks',
  'International Red Cross',
  'Broken Chair Geneva',
  'Palais des Nations',
  'sw.js',
];
for (const c of checks) {
  console.log((s.includes(c) ? 'OK   ' : 'MISS ') + c);
}
// Print a snippet around aggregateRating
const i = s.indexOf('aggregateRating');
if (i >= 0) console.log('\n--- aggregateRating snippet ---\n' + s.slice(i, i + 320));
