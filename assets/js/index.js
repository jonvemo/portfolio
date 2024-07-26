import { getHTML } from "/assets/js/include.js"
import { SKILLS } from "/assets/js/skills.js"
import { SOCIALMEDIA } from "/assets/js/social-links.js"
import { IMG_ERROR } from "/assets/js/error.js"

document.addEventListener('DOMContentLoaded', ev => {
  const $MAIN = document.getElementById('main')

  const imgs = document.querySelectorAll('img')
  imgs.forEach(img => img.addEventListener('error', ev => {
    IMG_ERROR(img)
  }))

  document.addEventListener('click', ev => {
    const TARGET = ev.target
    if (TARGET.matches('#toggle__social__btn, #toggle__social__btn *')) {
      const
        $SOCIALMEDIA_HIDDEN = document.getElementById('social__hidden'),
        $BTN_USE = document.getElementById('change__icon'),
        CURRENT_ICON = $BTN_USE.getAttribute('href')

      $SOCIALMEDIA_HIDDEN.classList.toggle('hidden')
      CURRENT_ICON === '/assets/icon/icons.svg#caret__right' ? $BTN_USE.setAttribute('href', '/assets/icon/icons.svg#caret__left') : $BTN_USE.setAttribute('href', '/assets/icon/icons.svg#caret__right')
    }
    if (TARGET.matches('.navegator__request, .navegator__request *')) {
      ev.preventDefault()

      let url
      if (TARGET.matches('.navegator__request >* *')) {
        url = TARGET.parentNode.parentNode.href
      } else if (TARGET.matches('.navegator__request >*')) {
        url = TARGET.parentNode.href
      } else {
        url = TARGET.href
      }

      getHTML(url,
        {
          success: (html) => {
            $MAIN.innerHTML = html
          },
          error: () => {
            const errorPageURL = '/page/404.html'
            getHTML(errorPageURL, {
              success: (html) => {
                $MAIN.innerHTML = html
              },
              error: (err) => {
                $MAIN.innerHTML = `<h1>${err}</h1>`
              }
            })
          }
        }
      )
    }

  })
  SOCIALMEDIA()
  SKILLS()
})
