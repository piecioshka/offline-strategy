// Update value, when would you like to reinstall Service Worker.
// HINT: Update value on every deploy.
self.CACHED_NAME = 'demo-1.0.0';

// Append URL to precache.
// WARNING: Cannot use wildcards.
self.PRECACHE_FILES = [
    '/demo/',
    '/demo/main.js',
    '/demo/bulma.min.css'
];

if (navigator.onLine) {
    self.importScripts('https://offline-strategy.piecioshka.io/hybrid.js');
}
