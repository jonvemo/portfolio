const APP = {
    SW: null,
    cacheName: 'CACHE',
    isOnline: 'onLine' in navigator && navigator.onLine,
    init() {
        // APP.registerSW()

        window.addEventListener('online', APP.goneOnline)
        window.addEventListener('offline', APP.goneOffline)

    },
    registerSW(){
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register('/sw.js')
            .then( reg=>console.log(`Service Worker Registered in %cscope: ${reg.scope}`,'font-weight:bold;') )
            .catch( err=>console.warn(`%cError ${err}`, 'color: red; font-size: 1.5rem; font-weight: bold;') )
        }
    },
    goneOnline(){
        const $PROBABLY = document.getElementById('isOnOff')
        
        !$PROBABLY.classList.contains('isOnOff') ? $PROBABLY.classList.toggle('isOnOff') : ''
        isOnOff__content.textContent = 'Online'
    },
    goneOffline(){
        const $PROBABLY = document.getElementById('isOnOff')

        $PROBABLY.classList.toggle('isOnOff')
        isOnOff__content.textContent = 'Offline'
    }
}

document.addEventListener('DOMContentLoaded', APP.init)