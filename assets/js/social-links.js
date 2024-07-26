export const SOCIALMEDIA = () => {

  const
    $SOCIALMEDIA = document.getElementById('social'),
    $SOCIALMEDIA__HIDDEN = document.getElementById('social__hidden'),
    LINKS = [
      'https://linkedin.com/in/jonvemo',
      'https://github.com/jonvemo',
      'https://twitter.com/jonvemodev'
    ],
    LINKS_HIDDEN = [
      'https://instagram.com/jonvemodev',
    ],
    $TEMPLATE_SOCIAL = document.getElementById('template__social').content,
    $TEMPLATE_SOCIAL_PLUS = document.getElementById('template__social__plus').content,
    $FRAGMENT = document.createDocumentFragment()

  const insertSocialLinks = (links, template, container, insertAtStart) => {
    links.forEach((el, i) => {
      const
        LINK = links[i],
        DOMAIN_NAME = LINK.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n.]+)/im)[1]

      template.querySelector('a').href = LINK
      template.querySelector('a').setAttribute('aria-label', `${DOMAIN_NAME}'s Profile`)
      template.querySelector('use').setAttribute('href', `/assets/icon/icons.svg#${DOMAIN_NAME}`)
      template.querySelector('span').textContent = `${DOMAIN_NAME}`

      let $clone = document.importNode(template, true)
      $FRAGMENT.appendChild($clone)
    })

    insertAtStart ? container.insertBefore($FRAGMENT, container.firstChild) : container.appendChild($FRAGMENT)
  }

  insertSocialLinks(LINKS, $TEMPLATE_SOCIAL, $SOCIALMEDIA, true)
  insertSocialLinks(LINKS_HIDDEN, $TEMPLATE_SOCIAL_PLUS, $SOCIALMEDIA__HIDDEN, false)
}
