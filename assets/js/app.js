const APP = {
    SW: null,
    cacheName: 'CACHE',
    init() {
        APP.registerSW()
    },
    registerSW(){
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register('/sw.js')
            .then( reg=>console.log(`Service Worker Registered in %cscope: ${reg.scope}`,'font-weight:bold;') )
            .catch( err=>console.warn(`%cError ${err}`, 'color: red; font-size: 1.5rem; font-weight: bold;') )
        }
    }
}

document.addEventListener('DOMContentLoaded', APP.init)