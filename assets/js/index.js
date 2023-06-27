import { getHTML } from "/assets/js/include.js"
import { SKILLS } from "/assets/js/skills.js"
import { SOCIALMEDIA } from "/assets/js/social-links.js"

document.addEventListener('DOMContentLoaded', ev=>{
    const $MAIN = document.getElementById('main')

    document.addEventListener('click',ev=>{
        const TARGET = ev.target
        if(TARGET.matches('#toggle__social__btn, #toggle__social__btn *')){
            const 
                $SOCIALMEDIA_HIDDEN = document.getElementById('social__hidden'),
                $BTN_USE = document.getElementById('change__icon'),
                CURRENT_ICON = $BTN_USE.getAttribute('href')

            $SOCIALMEDIA_HIDDEN.classList.toggle('hidden')
            CURRENT_ICON === '#caret__right' ? $BTN_USE.setAttribute('href', '#caret__left') : $BTN_USE.setAttribute('href', '#caret__right')
        }
        if(TARGET.matches('.navegator__request, .navegator__request *')) {
            ev.preventDefault()
        
            let url = TARGET.href
            TARGET.matches('.navegator__request *') ? url = TARGET.parentNode.href : url = TARGET.href
        
            getHTML({
                url: url,
                success: (html) => {
                    $MAIN.innerHTML = html
                },
                error: (html) => {
                    const errorPageURL = '/error.html' // URL de la página de error
                    const errorXHR = new XMLHttpRequest()
                    errorXHR.addEventListener('load', () => {
                      $MAIN.innerHTML = errorXHR.responseText
                    })
                    errorXHR.open('GET', errorPageURL)
                    errorXHR.setRequestHeader('Content-type', 'text/html; charset=utf-8')
                    errorXHR.send()
                  }
            })
        }
        
    })
    SOCIALMEDIA()
    SKILLS()
})