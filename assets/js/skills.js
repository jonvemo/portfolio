export async function SKILLS() {
    try {
        const response = await fetch('/data/skills.json')
        const data = await response.json()

        const $FRAGMENT = document.createDocumentFragment();
        const CATEGORIES = Object.keys(data);

        const INSERT_CATEGORIE = (category, template, container) => {
            const CATEGORIE = data[category].map(item => item.name);
        
            CATEGORIE.forEach(skill => {
                const $clone = document.importNode(template, true);
                $clone.querySelector('use').setAttribute('href', `#${skill.toLowerCase()}`)
                $clone.querySelector('span').textContent = skill
                $FRAGMENT.appendChild($clone)
            })

            container.appendChild($FRAGMENT)
        }

        CATEGORIES.forEach(category => {
            const $TEMPLATE = document.getElementById(`template__${category}`).content
            const $CONTAINER = document.getElementById(category)
            INSERT_CATEGORIE(category, $TEMPLATE, $CONTAINER)
        })

    }
    catch (error) {
        console.error('Error:', error);
    }
}