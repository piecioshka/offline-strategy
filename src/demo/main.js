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
