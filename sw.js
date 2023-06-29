const VERSION = 3
let 
  nameDynamic = `Dynamic CACHE-${VERSION}`,
  nameStatic = `Static CACHE-${VERSION}`,
  nameImg = `Image CACHE-${VERSION}`
  nameFont = `Font CACHE-${VERSION}`,
  nameCSS = `CSS CACHE-${VERSION}`,
  nameJs = `Js CACHE-${VERSION}`

let 
  assets = ['/assets/css/index.css'],
  assetsImg = ['/assets/img/favicon.png']


async function cacheAssetsAndImages() {
  try {
    const cacheStatic = await caches.open(nameStatic);
    const cacheImg = await caches.open(nameImg);

    await cacheStatic.addAll(assets);
    await cacheImg.addAll(assetsImg);

    console.log(`${nameStatic} and ${nameImg} have been updated`);
  } 
  catch (err) {
    console.warn(`Failed to update ${nameStatic} or ${nameImg}`);
  }
}

async function deleteOldCaches() {
  const keys = await caches.keys()
  const oldCacheKeys = keys.filter((key) => key !== nameStatic && key !== nameImg)
  const deletePromises = oldCacheKeys.map((key) => caches.delete(key))
  await Promise.all(deletePromises)
}

function getCacheName(type, url) {
  const cacheMap = {
    'image': nameImg,
    'font': nameFont,
    'text/css': nameCSS,
    'application/javascript': nameJs,
  }

  for (const key in cacheMap) {
    if (type && type.match(new RegExp('^' + key, 'i'))) return cacheMap[key]
  }

  if (url.match(/fonts.googleapis.com/i) || url.match(/fonts.gstatic.com/i)) return nameCSS

  return nameDynamic;
}

async function saveToCache(cacheName, request, response) {
  const cache = await caches.open(cacheName);
  cache.put(request, response.clone());
  return response;
}

async function loadFromCache(request) {
  if (!navigator.onLine) {
    const cacheRes = await caches.match(request)
    if (cacheRes) return cacheRes
  }
}

  
self.addEventListener('install', async (ev) => {
  console.log(`Version ${VERSION} installed`);
  await cacheAssetsAndImages()
})

self.addEventListener('activate', (ev) => {
  console.log('Activated')
  ev.waitUntil( deleteOldCaches().then(() => { console.log('Old cache deleted') }) )
})


self.addEventListener('fetch', async (ev) => {
  const cacheRes = await caches.match(ev.request)
  if (cacheRes) return cacheRes

  try {
    await loadFromCache(ev.request);
  }
  catch (error) {
    console.error(`Error up load from cache: ${error}`);
  }

  try {
    const fetchResponse = await fetch(ev.request);
    const type = fetchResponse.headers.get('content-type');
    const cacheName = getCacheName(type, ev.request.url);
    console.log(`Save a ${type.toUpperCase()} file ${ev.request.url}`);
    return saveToCache(cacheName, ev.request, fetchResponse);
  }
  catch (error) {
    console.error(`Fetch failed: ${error}`)  
  }
})