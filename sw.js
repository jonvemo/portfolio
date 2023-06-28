const VERSION = 2
let 
  nameDynamic = `Dynamic CACHE`,
  nameStatic = `Static CACHE-${VERSION}`,
  nameCSS = `CSS CACHE-${VERSION}`,
  nameFont = `Font CACHE-${VERSION}`,
  nameImg = `Image CACHE-${VERSION}`

let 
  assets = ['/assets/css/index.css'],
  assetsImg = ['/assets/img/favicon.png']


self.addEventListener('install', (ev) => {
  console.log(`Version ${VERSION} installed`);
  ev.waitUntil(
    Promise.all([cacheAssets(), cacheImages()])
      .then(() => {
        console.log(`${nameStatic} and ${nameImg} have been updated`);
      })
      .catch((err) => {
        console.warn(`Failed to update ${nameStatic} or ${nameImg}`);
      })
  );
});

function cacheAssets() {
  return caches.open(nameStatic)
    .then((cache) => cache.addAll(assets));
}

function cacheImages() {
  return caches.open(nameImg)
    .then((cache) => cache.addAll(assetsImg));
}
  

self.addEventListener('activate', (ev) => {
  console.log('Activated');
  ev.waitUntil(
    deleteOldCaches()
      .then((empties) => {})
  )
})

async function deleteOldCaches() {
  const keys = await caches.keys();
  const oldCacheKeys = keys.filter((key) => key !== nameStatic && key !== nameImg);
  const deletePromises = oldCacheKeys.map((key) => caches.delete(key));
  await Promise.all(deletePromises);
}



/*self.addEventListener('fetch', ev => {  
  ev.respondWith(
    caches.match(ev.request).then( cacheRes => {
      return (
        cacheRes ||
        fetch(ev.request).then( async fetchResponse => {
          let type = fetchResponse.headers.get('content-type')
          if (
            (type && type.match(/^text\/css/i)) ||
            ev.request.url.match(/fonts.googleapis.com/i)
          ) {
            // CSS to save in dynamic cache
            console.log(`Save a CSS file ${ev.request.url}`)
            return caches.open(nameCSS).then( cache => {
              cache.put(ev.request, fetchResponse.clone())
              return fetchResponse
            })
          } else if (
            (type && type.match(/^font\//i)) ||
            ev.request.url.match(/fonts.gstatic.com/i)
          ) {
            console.log(`Save a FONT file ${ev.request.url}`)
            return caches.open(nameFont).then( cache => {
              cache.put(ev.request, fetchResponse.clone())
              return fetchResponse
            })
          } else if (type && type.match(/^image\//i)) {
            // Save in image cache
            console.log(`Save an IMAGE file ${ev.request.url}`)
            return caches.open(nameImg).then( cache => {
              cache.put(ev.request, fetchResponse.clone())
              return fetchResponse
            })
          } else {
            // Save in dynamic cache
            console.log(`Save an OTHER file ${ev.request.url}`)
            return caches.open(nameDynamic).then( cache => {
              cache.put(ev.request, fetchResponse.clone())
              return fetchResponse
            })
          }
        })
      )
    })
  )
})*/