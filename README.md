# offline-strategy

:hammer: Enable **offline mode** in your page!

## Demo 🎉

<https://offline-strategy.herokuapp.com/demo/>

## Features

* :no_entry: **Use `Network only` strategy**
    - returns response from HTTP request
* :no_entry: **Use `Cache only` strategy**
    - returns resource from Cache
* :no_entry: **Use `Network, fallback Cache` strategy**
    - when connection:
        + works make HTTP request, and save to Cache
        + is broken, return resource from Cache
* :no_entry: **Use `Cache, fallback Network` strategy**
    - verify that resource is in Cache
    - when missing make HTTP request, and save to Cache
* :white_check_mark: **Use `Hybrid` strategy** :star2:
    - verify that resource is in Cache
    - when connection:
        + works make HTTP request, and save to Cache
        + is broken, return resource from Cache

## Installation

1. Check, that you site is running on HTTPS.

    :bulb: Hint: Add redirect from HTTP to HTTPS.

2. Create file `service-worker.js`:

    ```js
    // Update value, when would you like to reinstall Service Worker.
    // HINT: Update value on every deploy.
    self.CACHED_NAME = 'demo-1.0.0';

    // Append URL to precache.
    // WARNING: Cannot use wildcards.
    self.PRECACHE_FILES = [
        '/',
        '/index.html'
    ];

    if (navigator.onLine) {
        self.importScripts('https://offline-strategy.herokuapp.com/hybrid.js');
    }
    ```

3. Register `Service Worker` by adding code in file `main.js`:

    ```js
    // What part of app should handle Service Worker
    const SERVICE_WORKER_SCOPE = '/demo/';

    // File, where Service Worker is defined
    const SERVICE_WORKER_URL = '/demo/service-worker.js';

    async function setupServiceWorker() {
        // console.log('[App] Call setupServiceWorker()');
        const isServiceWorkerSupported = ('serviceWorker' in navigator);

        if (!isServiceWorkerSupported) {
            console.warn('[App] Service Workers are not supported');
            return;
        }

        const isRegistered = navigator.serviceWorker.controller
            && (navigator.serviceWorker.controller.state === 'activated');

        if (isRegistered) {
            console.log('[App] Service Worker was registered yet');
            return;
        }

        registerServiceWorker();
    }

    async function registerServiceWorker() {
        // console.log('[App] Call registerServiceWorker()');
        await navigator.serviceWorker.register(SERVICE_WORKER_URL, {
            scope: SERVICE_WORKER_SCOPE
        });
        console.log(`[App] New Service Worker is register (scope: ${SERVICE_WORKER_SCOPE})`);
    }

    setupServiceWorker().catch((err) => {
        console.error('[App] Registration of new Service Worker failed', { err });
    });
    ```

## Available strategies

### (TODO) `Network first` strategy

```js
self.importScripts('https://offline-strategy.herokuapp.com/network-first.js');
```

### (TODO) `Cache first` strategy

```js
self.importScripts('https://offline-strategy.herokuapp.com/cache-first.js');
```

### (TODO) `Network first, fallback Cache` strategy

```js
self.importScripts('https://offline-strategy.herokuapp.com/network-first-fallback-cache.js');
```

### (TODO) `Cache first, fallback Network` strategy

```js
self.importScripts('https://offline-strategy.herokuapp.com/cache-first-fallback-network.js');
```

### `Hybrid` strategy

```js
self.importScripts('https://offline-strategy.herokuapp.com/hybrid.js');
```

## Related

* [test-service-worker-offline-page](https://github.com/piecioshka/test-service-worker-offline-page)
    — Testing Service Worker with building offline page
* [test-service-worker-substitute-resource](https://github.com/piecioshka/test-service-worker-substitute-resource)
    — Testing Service Worker to substitute resource
* [test-service-worker-cache-mechanism](https://github.com/piecioshka/test-service-worker-cache-mechanism)
    — Testing Service Worker with hybrid strategy
* [warsawjs-workshop-28-pwa](https://github.com/piecioshka/warsawjs-workshop-28-pwa)
    — WarsawJS Workshop #28: Video service app with PWA principles

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2019
