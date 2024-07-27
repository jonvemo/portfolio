const VERSION = 3
const CACHE_NAME = `CACHE-${VERSION}`
const CACHE_LIST = ['/assets/icon/icons.svg', '/assets/css/index.css', '/assets/img/favicon/favicon.svg', '/assets/img/favicon/google-touch-icon.png', '/page/404.html']

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(CACHE_NAME).then((cache) => { cache.addAll(CACHE_LIST) })
  )
})

self.addEventListener('activate', (ev) => {
  console.log('Activated')
  ev.waitUntil(
    caches.keys().then((keys) => { return Promise.all(keys.filter((key) => key != CACHE_NAME).map((nm) => caches.delete(nm))) })
  )
})

self.addEventListener('fetch', (ev) => {
  const isOnline = navigator.onLine
  isOnline ? ev.respondWith(networkRevalidateAndCache(ev)) : ev.respondWith(cacheOnly(ev))
})

function cacheOnly(ev) {
  // Return what is in the cache
  return caches.match(ev.request);
}
async function cacheFirst(ev) {
  try {
    // Return from cache or fetch if not in cache
    const CACHE_RESPONSE = await caches.match(ev.request)
    // Return CACHE_RESPONSE if not null
    return CACHE_RESPONSE || fetch(ev.request)
  } catch (error) {
    console.error("cacheFirst error:", error)
    throw error
  }
}
function networkOnly(ev) {
  // Return fetch response
  return fetch(ev.request);
}
async function networkFirst(ev) {
  try {
    // Try fetch and fallback on cache
    const FETCH_RESPONSE = await fetch(ev.request)
    if (FETCH_RESPONSE.ok) return FETCH_RESPONSE
    return caches.match(ev.request)
  } catch (error) {
    console.error("networkFirst error:", error)
    throw error
  }
}

async function staleWhileRevalidate(ev) {
  try {
    // Check cache and fallback on fetch for response
    // Always attempt to fetch a new copy and update the cache
    const CACHE_RESPONSE = await caches.match(ev.request)
    const FETCH_RESPONSE = await fetch(ev.request)
    if (FETCH_RESPONSE.ok) {
      const CACHE = await caches.open(CACHE_NAME)
      CACHE.put(ev.request, FETCH_RESPONSE.clone())
      return FETCH_RESPONSE
    }
    return CACHE_RESPONSE || FETCH_RESPONSE
  } catch (error) {
    console.error("staleWhileRevalidate error:", error)
    throw error
  }
}

async function networkRevalidateAndCache(ev) {
  try {
    // Try fetch first and fallback on cache
    // Update cache if fetch was successful
    const FETCH_RESPONSE = await fetch(ev.request, { mode: 'cors', credentials: 'omit' })
    if (FETCH_RESPONSE.ok) {
      const CACHE = await caches.open(CACHE_NAME)
      CACHE.put(ev.request, FETCH_RESPONSE.clone())
      return FETCH_RESPONSE
    }
    return caches.match(ev.request)
  } catch (error) {
    console.error("networkRevalidateAndCache error:", error)
    throw error
  }
}
