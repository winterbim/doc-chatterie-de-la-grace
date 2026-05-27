const CACHE = 'cdlg-contrats-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/favicon.png',
  './icons/apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/pdfmake.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/vfs_fonts.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(u => new Request(u, { mode: 'no-cors' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
