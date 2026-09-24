// Broken Chair Geneva — minimal PWA service worker.
// Strategy:
//  - Same-origin static assets (/_next/static, /gallery, icons, manifest): cache-first.
//  - Navigations and everything else: network-first, with a cached copy as fallback
//    (and the cached homepage when fully offline) so the app remains resilient.

const CACHE = 'brokenchairgeneva-v1';
const STATIC_PREFIXES = [
  '/_next/static/',
  '/gallery/',
  '/images/',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/manifest.webmanifest',
];

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

function isStatic(url) {
  const path = url.pathname;
  return STATIC_PREFIXES.some((p) => path.startsWith(p) || path === p);
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isStatic(url)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req)
            .then((res) => {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
              return res;
            })
            .catch(() => cached)
      )
    );
    return;
  }

  event.respondWith(
    fetch(req).catch(() =>
      caches.match(req).then((cached) => cached || caches.match('/en'))
    )
  );
});
