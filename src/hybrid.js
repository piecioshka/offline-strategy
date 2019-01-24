const console = (({ log, error }, label) => ({
    log: (...args) => log(label, ...args),
    error: (...args) => error(label, ...args)
}))(self.console, '[Service Worker]');

self.addEventListener('install', handleInstall);

function handleInstall(evt) {
    console.log('Event: install', { evt });
    evt.waitUntil(
        precache().then(self.skipWaiting)
    );
}

async function precache() {
    const cache = await caches.open(self.CACHED_NAME);
    await cache.addAll(self.PRECACHE_FILES);
}

// -----------------------------------------------------------------------------

self.addEventListener('activate', handleActivate);

function handleActivate(evt) {
    console.log('Event: activate', { evt });
    return removeOldCaches();
}

async function removeOldCaches() {
    const cacheNames = await caches.keys();
    return await Promise.all(
        cacheNames
            .filter((name) => (name !== self.CACHED_NAME))
            .map((name) => caches.delete(name))
    );
}

// -----------------------------------------------------------------------------

self.addEventListener('fetch', handleFetch);

function handleFetch(evt) {
    const url = evt.request && evt.request.url;
    console.log('Event: fetch', url, { evt });
    evt.respondWith(hybridStrategy(evt));
}

async function hybridStrategy(evt) {
    const request = evt.request;

    const cache = await caches.open(self.CACHED_NAME);
    const resource = await cache.match(request);

    if (resource) {
        console.log(' => Hit cache', request.url);
        return resource;
    }

    console.log(' => Download fresh resource', request.url);
    const response = await fetch(request.clone());

    // Save into cache.
    await cache.put(request, response.clone());

    return response;
}
