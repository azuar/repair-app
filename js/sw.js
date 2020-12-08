const CACHE_NAME = "smart-repair1";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/navbar.html",
    "/index.html",
    "/pages/landing-page.html",
    "/pages/login.html",
    "/pages/sign-up.html",
    "/img/icon.png",
    "/img/icon2.png",
    "/img/icon3.png",
    "/img/icon4.png",
    "/img/jumbotron.png",
    "/img/rawat-hp.jpeg",
    "/img/smart-lemot.jpeg",
    "/img/virus-alert.jpg",
    "/css/materialize.css",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.js",
    "/js/materialize.min.js",
    "/js/page-loads.js",
    "/js/modal.js",
];

// Instal Service Worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
})

// Delete Cache
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if (cacheName != CACHE_NAME) {
                            console.log("ServiceWorker: cache " + cacheName + " dihapus");
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
})

// Use Aset
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
                return fetch(event.request);
            })
    );
});
