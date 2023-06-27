export function SKILLS() {
    return fetch('/data/skills.json')
    .then(response => response.json())
    .then(data => {
        const $FRONTEND = document.getElementById('frontend')
        const FRONTEND = data.frontend
        const $TEMPLATE_FRONTEND = document.getElementById('template__frontend').content
        const $FRAGMENT = document.createDocumentFragment()
        const insertSkills = (links, template, container) => {
            console.log(links,template,container)
            links.forEach((el, i) => {
                const 
                    LINK = links[i]
        
                template.querySelector('use').setAttribute('href', `#${el.toLowerCase()}`)
                template.querySelector('span').textContent = `${el}`
        
                let $clone = document.importNode(template, true)
                $FRAGMENT.appendChild($clone)
            })
            
            container.replaceChildren($FRAGMENT)
        }
        
        insertSkills(FRONTEND, $TEMPLATE_FRONTEND, $FRONTEND)
        
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
  