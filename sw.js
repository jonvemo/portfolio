const VERSION = 4;
const CACHE_NAME = `CACHE-${VERSION}`;
const CACHE_LIST = [
	"/assets/fonts/Nunito-Regular.woff2",
	"/assets/fonts/Nunito-Bold.woff2",
	"/assets/css/index.css",
	"/assets/img/favicon/favicon.svg",
	"/assets/img/favicon/google-touch-icon.png",
	"/page/404.html",
];

self.addEventListener("install", (ev) => {
	ev.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			cache.addAll(CACHE_LIST);
		}),
	);
});

self.addEventListener("activate", (ev) => {
	console.log("Activated");
	ev.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.filter((key) => key != CACHE_NAME).map((nm) => caches.delete(nm)),
			);
		}),
	);
});

self.addEventListener("fetch", (ev) => {
	const isOnline = navigator.onLine;
	isOnline
		? ev.respondWith(staleWhileRevalidate(ev))
		: ev.respondWith(cacheOnly(ev));
});

function cacheOnly(ev) {
	return caches.match(ev.request);
}

async function staleWhileRevalidate(ev) {
	const cache = await caches.open(CACHE_NAME);
	const cachedResponse = await cache.match(ev.request);
	const fetchPromise = fetch(ev.request).then((networkResponse) => {
		cache.put(ev.request, networkResponse.clone());
		return networkResponse;
	});
	return cachedResponse || fetchPromise;
}
