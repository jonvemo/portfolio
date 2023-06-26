const 
    $FRONTEND = document.getElementById('frontend'),
    FRONTEND = [
        'JavaScript',
        'TypeScript',
        'React',
        'Git',
        'HTML',
        'CSS',
        'SEO',
        'PWA',
    ],
    $DESIGN = document.getElementById('design'),
    DESIGN = [
        'Accessibility',
        'Responsive',
        'Figma',
    ], 
    $PLATAFORMS = document.getElementById('plataforms'),
    PLATAFORMS = [
        'Blogger',
    ],
    $TEMPLATE_FRONTEND = document.getElementById('template__frontend').content,
    $TEMPLATE_DESIGN = document.getElementById('template__design').content,
    $TEMPLATE_PLATAFORMS = document.getElementById('template__plataforms').content,
    $FRAGMENT = document.createDocumentFragment()
    
export const SKILLS = () => {
    const insertSkills = (links, template, container) => {
        links.forEach((el, i) => {
            const 
                LINK = links[i]
    
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