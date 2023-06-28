export async function SKILLS() {
    try {
        const response = await fetch('/data/skills.json')
        const data = await response.json()

        const $FRAGMENT = document.createDocumentFragment();
        const CATEGORIES = Object.keys(data);

        const INSERT_CATEGORY = (category, template, container) => {
        const categoryData = data[category];
        const templateContent = template.content

        categoryData.forEach(item => {
            const skill = item.name;
            const $clone = templateContent.cloneNode(true);
            $clone.querySelector('use').setAttribute('href', `#${skill.toLowerCase()}`);
            $clone.querySelector('span').textContent = skill;
            $FRAGMENT.appendChild($clone);
        });

        container.appendChild($FRAGMENT);
        };

        const promises = CATEGORIES.map(async category => {
        const $TEMPLATE = document.getElementById(`template__${category}`);
        const $CONTAINER = document.getElementById(category);
        await INSERT_CATEGORY(category, $TEMPLATE, $CONTAINER);
        });

        await Promise.all(promises);

    }
    catch (error) {
        console.error('Error:', error);
    }
}