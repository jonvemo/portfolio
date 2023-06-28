const APP = {
    SW: null,
    cacheName: 'CACHE',
    isOnline: 'onLine' in navigator && navigator.onLine,
    init() {
        // APP.registerSW()

        window.addEventListener('offline', APP.offline)
        window.addEventListener('online', APP.online)
          

    },
    registerSW(){
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register('/sw.js')
            .then( reg=>console.log(`Service Worker Registered in %cscope: ${reg.scope}`,'font-weight:bold;') )
            .catch( err=>console.warn(`%cError ${err}`, 'color: red; font-size: 1.5rem; font-weight: bold;') )
        }
    },
    offline(){
        const $PROBABLY = document.getElementById('isOnOff')
        $PROBABLY.classList.add('isOnOff')
        $PROBABLY.querySelector('use').setAttribute('href', `#offline`)

        setTimeout(() => {
            $PROBABLY.classList.remove('isOnOff');
        }, 10000);
        
    },
    online(){
        const $PROBABLY = document.getElementById('isOnOff')
        $PROBABLY.classList.add('isOnOff')
        $PROBABLY.querySelector('use').setAttribute('href', `#online`)

        setTimeout(() => {
            $PROBABLY.classList.remove('isOnOff');
        }, 10000);
    }
}

document.addEventListener('DOMContentLoaded', APP.init)