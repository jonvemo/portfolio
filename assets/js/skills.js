export const SKILLS = () => {
    
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
    $DESING = document.getElementById('desing'),
    DESING = [
        'Accessibility',
        'Responsive',
        'Figma',
    ], 
    $PLATAFORMS = document.getElementById('plataforms'),
    PLATAFORMS = [
        'Blogger',
    ],
    $TEMPLATE_FRONTEND = document.getElementById('template__frontend').content,
    $TEMPLATE_DESING = document.getElementById('template__desing').content,
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
        
        container.appendChild($FRAGMENT)
    }
    
    insertSkills(FRONTEND, $TEMPLATE_FRONTEND, $FRONTEND)
    insertSkills(DESING, $TEMPLATE_DESING, $DESING)
    insertSkills(PLATAFORMS, $TEMPLATE_PLATAFORMS, $PLATAFORMS)
}