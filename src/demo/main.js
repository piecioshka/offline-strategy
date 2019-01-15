
const SERVICE_WORKER_URL = 'service-worker.js';
const isServiceWorkerSupported = ('serviceWorker' in navigator);

if (isServiceWorkerSupported) {
    const isRegistered = navigator.serviceWorker.controller
        && (navigator.serviceWorker.controller.state === 'activated');

    if (isRegistered) {
        console.log('[App] Service Worker was registered. Do not register again');
    } else {
        console.log('[App] New Service Worker is registered');
        navigator.serviceWorker.register(SERVICE_WORKER_URL, {
            scope: '/demo/'
        });
    }
}
