export function fetchSkillsData() {
    return fetch('/data/skills.json')
    .then(response => response.json())
    .then(data => {
        const $FRONTEND = document.getElementById('frontend')
        const FRONTEND = data.frontend

        $TEMPLATE_FRONTEND = document.getElementById('template__frontend').content,
        $TEMPLATE_DESIGN = document.getElementById('template__design').content,
        $TEMPLATE_PLATAFORMS = document.getElementById('template__plataforms').content,
        $FRAGMENT = document.createDocumentFragment()
        const insertSkills = (links, template, container) => {
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
  