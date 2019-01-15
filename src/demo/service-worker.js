// Update value, when would you like to reinstall Service Worker
self.CACHED_NAME = 'demo-1.0.0';

// Append URL to precache. Cannot use wildcards.
self.PRECACHE_FILES = [
    '/demo/',
    '/demo/main.js',
    '/demo/bulma.min.css'
];

if (navigator.onLine) {
    self.importScripts('/hybrid.js');
}
