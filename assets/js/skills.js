export function SKILLS() {
    return fetch('/data/skills.json')
    .then(response => response.json())
    .then(data => {
        const $FRONTEND = document.getElementById('frontend')
        const FRONTEND_SKILLS = data.frontend
        const FRONTEND_NAME = FRONTEND_SKILLS.map(skill => skill.name)
        const FRONTEND_ICON = FRONTEND_SKILLS.map(skill => skill.icon)
        const $TEMPLATE_FRONTEND = document.getElementById('template__frontend').content

        const $DESIGN = document.getElementById('design')
        const DESIGN_SKILLS = data.frontend
        const DESIGN_NAME = FRONTEND_SKILLS.map(skill => skill.name)
        const DESIGN_ICON = FRONTEND_SKILLS.map(skill => skill.icon)
        const $TEMPLATE_DESIGN = document.getElementById('template__design').content

        const $FRAGMENT = document.createDocumentFragment()
        const insertSkills = (skill,icon,template,container) => {
            
            skill.forEach( (el) => {
                
                template.querySelector('use').setAttribute('href', `#${el.toLowerCase()}`)
                template.querySelector('span').textContent = `${el}`
        
                let $clone = document.importNode(template, true)
                $FRAGMENT.appendChild($clone)
            })
            
            container.replaceChildren($FRAGMENT)
        }
        
        insertSkills(FRONTEND_NAME,FRONTEND_ICON,$TEMPLATE_FRONTEND,$FRONTEND)
        insertSkills(DESIGN_NAME,DESIGN_ICON,$TEMPLATE_DESIGN,$DESIGN)
        
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
  