# offline-strategy

[![dependencies](https://david-dm.org/piecioshka/offline-strategy.svg)](https://github.com/piecioshka/offline-strategy)

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

1. Create file `service-worker.js`:

    ```js
    // Update value, when would you like to reinstall Service Worker
    self.CACHED_NAME = 'demo-1.0.0';

    // Append URL to precache. Cannot use wildcards.
    self.PRECACHE_FILES = [
        '/',
        '/index.html'
    ];

    if (navigator.onLine) {
        self.importScripts('https://offline-strategy.herokuapp.com/hybrid.js');
    }
    ```

2. Register `Service Worker` by adding code in file `main.js`:

    ```js
    const SERVICE_WORKER_URL = '/service-worker.js';
    const isServiceWorkerSupported = ('serviceWorker' in navigator);

    if (isServiceWorkerSupported) {
        const isRegistered = navigator.serviceWorker.controller
            && (navigator.serviceWorker.controller.state === 'activated');

        if (isRegistered) {
            console.log('[App] Service Worker was registered. Do not register again');
        } else {
            console.log('[App] New Service Worker is registered');
            navigator.serviceWorker.register(SERVICE_WORKER_URL);
        }
    }
    ```

## Available strategies

### `Network first` strategy

```js
self.importScripts('https://offline-strategy.herokuapp.com/network-first.js');
```

### `Cache first` strategy

```js
self.importScripts('https://offline-strategy.herokuapp.com/cache-first.js');
```

### `Network first, fallback Cache` strategy

```js
self.importScripts('https://offline-strategy.herokuapp.com/network-first-fallback-cache.js');
```

### `Cache first, fallback Network` strategy

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
