import { getHTML } from "/assets/js/include.js"
// import { Skills } from "/assets/js/skills.js"
import { SOCIALMEDIA } from "/assets/js/social-links.js"

document.addEventListener('DOMContentLoaded', ev=>{
    const $MAIN = document.getElementById('main')

    document.addEventListener('click',ev=>{
        const TARGET = ev.target
        if(TARGET.matches('#toggle__social__btn, #toggle__social__btn *')){
            const 
                $SOCIALMEDIA_HIDDEN = document.getElementById('social__hidden'),
                $BTN_USE = document.getElementById('change__icon'),
                CURRENT_ICON = $BTN_USE.getAttribute('href')

            $SOCIALMEDIA_HIDDEN.classList.toggle('hidden')
            CURRENT_ICON === '#caret__right' ? $BTN_USE.setAttribute('href', '#caret__left') : $BTN_USE.setAttribute('href', '#caret__right')
        }
        if(TARGET.matches('.navegator__request, .navegator__request *')) {
            ev.preventDefault()
        
            let url = TARGET.href
            TARGET.matches('.navegator__request *') ? url = TARGET.parentNode.href : url = TARGET.href
        
            getHTML({
                url: url,
                success: (html) => {
                    $MAIN.innerHTML = html
                },
                error: (err) => {
                    $MAIN.innerHTML = `<h1>${err}</h1>`
                }
            })
        }
    })

    class Skills {
        constructor(containerId, templateId) {
          this.container = document.getElementById(containerId);
          this.template = document.getElementById(templateId).content;
          this.fragment = document.createDocumentFragment();
        }
      
        async fetchSkillsData(url) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return response.json();
        }
      
        insertSkills(data) {
          data.forEach((item) => {
            const $clone = this.template.cloneNode(true);
            $clone.querySelector('use').setAttribute('href', `#${item.icon}`);
            $clone.querySelector('span').textContent = item.name;
            this.fragment.appendChild($clone);
          });
        }
      
        async renderSkills(url, key) {
          try {
            const data = await this.fetchSkillsData(url);
            const skillsData = data[key] || [];
            this.insertSkills(skillsData);
          } catch (err) {
            console.error(err);
          }
        }
      }
      

    const SKILLS = new Skills('skills', 'template');

    const LOADSKILLS = async (url) => {
        try {
            const data = await SKILLS.fetchSkillsData(url)
            await Promise.all([
                SKILLS.renderSkills(data, 'frontend'),
                SKILLS.renderSkills(data, 'design'),
                SKILLS.renderSkills(data, 'platforms')
            ])
        } catch (err) {
            console.error(err);
        }
    }

    LOADSKILLS('skills.json');

    SOCIALMEDIA()
    
})