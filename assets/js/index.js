// import { SOCIALMEDIA } from "./social-links";

if('serviceWorker' in navigator){
	navigator.serviceWorker.register('./sw.js')
	.then(reg=>console.log('Success',reg))
	.catch(err=>console.warn('Error',err))
}

document.addEventListener('DOMContentLoaded',ev=>{
    // SOCIALMEDIA()
})