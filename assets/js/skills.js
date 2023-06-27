export function SKILLS() {
    return fetch('/data/skills.json')
    .then(response => response.json())
    .then(data => {

        const 
            $FRAGMENT = document.createDocumentFragment(),
            $FRONTEND = document.getElementById('frontend'),
            $DESIGN = document.getElementById('design'),
            $PLATAFORMS = document.getElementById('plataforms')
        
        const 
            $TEMPLATE_FRONTEND = document.getElementById('template__frontend').content,
            $TEMPLATE_DESIGN = document.getElementById('template__design').content,
            $TEMPLATE_PLATAFORMS = document.getElementById('template__plataforms').content

        const 
            FRONTEND_SKILL = data.frontend.map(item => item.name),
            DESIGN_SKILL = data.design.map(item => item.name),
            PLATAFORMS_SKILL = data.plataforms.map(item => item.name)

        const insertSkills = (skill,template,container) => {
            skill.forEach( el => {
                template.querySelector('use').setAttribute('href', `#${el.toLowerCase()}`)
                template.querySelector('span').textContent = `${el}`
        
                let $clone = document.importNode(template, true)
                $FRAGMENT.appendChild($clone)
            })
            
            container.replaceChildren($FRAGMENT)
        }
            
        insertSkills(FRONTEND_SKILL, $TEMPLATE_FRONTEND, $FRONTEND)
        insertSkills(DESIGN_SKILL, $TEMPLATE_DESIGN, $DESIGN)
        insertSkills(PLATAFORMS_SKILL, $TEMPLATE_PLATAFORMS, $PLATAFORMS)
        
    })
    .catch(error => {
        console.error('Error:', error)
    })
}