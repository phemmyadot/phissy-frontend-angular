const FILES_TO_CACHE = [
    '/offline.html',
  ];
  var CACHE_NAME = "cache-v1";

  self.addEventListener("install", (e) => {
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  });

  self.addEventListener('activate', function(event) {
    console.log('Finally active. Ready to start serving content!');
  });

  // self.addEventListener("fetch", (e) => {
  //     e.respondWith(
  //       fetch(evt.request)
  //           .catch(() => {
  //             return caches.open(CACHE_NAME)
  //                 .then((cache) => {
  //                   return cache.match('offline.html');
  //                 });
  //           })
  //     );
  // });
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
    console.log('Fetch');
  });
  // addEventListener('fetch', function(event) {
  //   event.respondWith(
  //     caches.match(event.request)
  //       .then(function(response) {
  //         if (response) {
  //           return response;     // if valid response is found in cache return it
  //         } else {
  //           return fetch(event.request)     //fetch from internet
  //             .then(function(res) {
  //               return caches.open(CACHE_NAME)
  //                 .then(function(cache) {
  //                   cache.put(event.request.url, res.clone());    //save the response for future
  //                   return res;   // return the fetched data
  //                 })
  //             })
  //             .catch(function(err) {       // fallback mechanism
  //               return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
  //                 .then(function(cache) {
  //                   return cache.match('offline.html');
  //                 });
  //             });
  //         }
  //       })
  //   );
  // });   
  
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
  
  if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
  } else {
    console.log(`Boo! Workbox didn't load 😬`);
  };
  
  workbox.routing.registerRoute(
      /\.js$/,
      new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
      /\.ts$/,
      new workbox.strategies.NetworkFirst()
    );
    workbox.routing.registerRoute(
      // Cache CSS files.
      /\.css$/,
      // Use cache but update in the background.
      new workbox.strategies.StaleWhileRevalidate({
        // Use a custom cache name.
        cacheName: 'css-cache',
      })
    );
    
    workbox.routing.registerRoute(
      // Cache image files.
      /\.(?:png|jpg|jpeg|svg|gif)$/,
      // Use the cache if it's available.
      new workbox.strategies.CacheFirst({
        // Use a custom cache name.
        cacheName: 'image-cache',
        plugins: [
          new workbox.expiration.Plugin({
            // Cache only 20 images.
            maxEntries: 20,
            // Cache for a maximum of a week.
            maxAgeSeconds: 7 * 24 * 60 * 60,
          })
        ],
      })
    );
  
  