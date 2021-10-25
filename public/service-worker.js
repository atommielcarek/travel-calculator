const cacheName = 'my-app-cache';
const dataCache = 'my-cache-data';
const contentToCache = [
    '/',
    '/index.js',
    '/service-worker.js',
    '/index.html',
    '/db.js',
    '/styles.css',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
      })());
  });

  self.addEventListener('fetch', (e) => {
    if (e.request.url.includes('/api/')) {
        console.log('[Service Worker Fetch(data)', e.request.url);
    }



    self.addEventListener('fetch', (event) => {
      e.respondWith(
          fetch(e.request).catch(() =>{
              return caches.match(event.r).then((res) => {
                  if (res) {
                      return res;
                  }else if (e.request.headers.get("accept").includes("text/html")){
                      return caches.match("/index.html");
                  }
              });
          })
      );
  });
})