export function SKILLS() {
    return fetch('/data/skills.json')
    .then(response => response.json())
    .then(data => {
        const $FRONTEND = document.getElementById('frontend')
        
        const FRONTEND_SKILLS = data.frontend
        const FRONTEND_NAME = FRONTEND_SKILLS.map(skill => skill.name)
        const FRONTEND_ICON = FRONTEND_SKILLS.map(skill => skill.icon)

        const $TEMPLATE_FRONTEND = document.getElementById('template__frontend').content
        const $FRAGMENT = document.createDocumentFragment()
        const insertSkills = (skill,icon,template,container) => {
            
            skill.forEach( el => {
                
                template.querySelector('use').setAttribute('href', `#${icon}`)
                template.querySelector('span').textContent = `${skill}`
        
                let $clone = document.importNode(template, true)
                $FRAGMENT.appendChild($clone)
            })
            
            container.replaceChildren($FRAGMENT)
        }
        
        insertSkills(FRONTEND_NAME,FRONTEND_ICON,$TEMPLATE_FRONTEND,$FRONTEND)
        
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
  