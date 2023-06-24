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


self.addEventListener('install', ev => {
  console.log(`Version ${VERSION} installed`)
  // Build a CACHE
  ev.waitUntil(
    caches.open(nameStatic).then( cache => {
      cache.addAll(assets).then(
        () => {
          console.log(`${nameStatic} has been updated`)
        },
        err => {
          console.warn(`Failed to update ${nameStatic}`)
        }
      )
    })
    .then( () => {
      caches.open(nameImg).then( cache => {
        cache.addAll(assetsImg).then(
          () => {
            console.log(`${nameImg} has been updated`)
          },
          err => {
            console.warn(`Failed to update ${nameStatic}`)
          }
        )
      })
    })
  )
})

self.addEventListener('activate', ev => {
  console.log('Activated')
  // Delete Old Versions of Caches
  ev.waitUntil(
    caches.keys().then( keys => {
      return Promise.all(
        keys
          .filter(key => {
            if(key != nameStatic && key != nameImg) {
              return true
            }
          })
          .map(key => caches.delete(key))
      ).then( empties => {
        // s
      })
    })
  )
})

self.addEventListener('fetch', ev => {  
  ev.respondWith(
    caches.match(ev.request).then( cacheRes => {
      return (
        cacheRes ||
        fetch(ev.request).then( fetchResponse => {
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
})