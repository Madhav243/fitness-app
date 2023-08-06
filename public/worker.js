var CACHE_NAME = 'pwa-fittr';
var urlsToCache = [
  '/',
];

// Install a service worker
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    // console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // console.log('request',event)
            return response || fetch(event.request);
        })
    );
});

// Update a service worker
self.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-fittr'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});