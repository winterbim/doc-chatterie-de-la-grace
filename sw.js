// Service worker v2 — stratégie "network-first" pour HTML/CSS/JS afin
// que les utilisateurs récupèrent toujours la dernière version dès qu'elle
// est en ligne. Cache hors-ligne conservé pour les ressources lourdes.

const CACHE = 'cdlg-contrats-v5';

const PRECACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/favicon.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  // Activation immédiate sans attendre que les anciens onglets se ferment.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.all(PRECACHE.map(url =>
        fetch(url, { cache: 'reload' })
          .then(res => res.ok ? cache.put(url, res) : null)
          .catch(() => null)
      ))
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Stratégie network-first pour tout ce qui vient du même domaine.
// Si la réponse réseau est OK : on la met en cache et on la sert.
// Si le réseau échoue : on retombe sur le cache.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin) {
    // network-first pour notre app : assure que la prod sert toujours la dernière version
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(req).then(cached => cached || caches.match('./index.html')))
    );
  } else {
    // stale-while-revalidate pour les CDN (fonts, pdfmake)
    event.respondWith(
      caches.match(req).then(cached => {
        const network = fetch(req).then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
  }
});

// Permet à la page de demander une mise à jour immédiate.
self.addEventListener('message', event => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});
