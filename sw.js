console.log('Service worker loaded');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js');

if (workbox) {
    console.log('WorkBox working');

    workbox.core.setCacheNameDetails({
        prefix: 'SmoothieDelight',
        suffix: 'v1.0'
    });

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        }),
    );

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                }),
            ],
        }),
    );

    workbox.googleAnalytics.initialize();

    workbox.routing.registerRoute(
        new RegExp('.*\.css'),
        new workbox.strategies.CacheFirst()
    );


    workbox.routing.registerRoute(
        new RegExp('/SmoothieRecruitment/images'),
        new workbox.strategies.StaleWhileRevalidate()
    );

} else {
    console.log('Workbox failed');
}