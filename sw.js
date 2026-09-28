const CACHE = 'frasopay-v1';
const FICHIERS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(noms => Promise.all(noms.filter(n => n !== CACHE).map(n => caches.delete(n))))
  );
  self.clients.claim();
});

// Cache d'abord : l'appli marche hors connexion après la première visite
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(rep => rep || fetch(e.request))
  );
});
