export const SKILLS = () => {
    const 
        $FRAGMENT = document.createDocumentFragment(),
        $FRONTEND = document.getElementById('frontend'),
        $DESIGN = document.getElementById('design'),
        $PLATAFORMS = document.getElementById('plataforms'),
        $TEMPLATE_FRONTEND = document.getElementById('template__frontend').content,
        $TEMPLATE_DESIGN = document.getElementById('template__design').content,
        $TEMPLATE_PLATAFORMS = document.getElementById('template__plataforms').content,
        FRONTEND = ['JavaScript','TypeScript','React','Git','HTML','CSS','SEO','PWA'],
        DESIGN = ['Accessibility','Responsive','Figma',], 
        PLATAFORMS = ['Blogger']

    const insertSkills = (links, template, container) => {
        links.forEach( el => {    
            template.querySelector('use').setAttribute('href', `#${el.toLowerCase()}`)
            template.querySelector('span').textContent = `${el}`
    
            let $clone = document.importNode(template, true)
            $FRAGMENT.appendChild($clone)
        })
        
        container.appendChild($FRAGMENT)
    }
    
    insertSkills(FRONTEND, $TEMPLATE_FRONTEND, $FRONTEND)
    insertSkills(DESIGN, $TEMPLATE_DESIGN, $DESIGN)
    insertSkills(PLATAFORMS, $TEMPLATE_PLATAFORMS, $PLATAFORMS)
}