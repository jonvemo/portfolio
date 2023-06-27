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
          this.containerId = containerId;
          this.templateId = templateId;
          this.container = null;
          this.template = null;
          this.fragment = document.createDocumentFragment();
        }
      
        async fetchSkillsData(url) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          return data;
        }
      
        async init() {
          this.container = document.getElementById(this.containerId);
          this.template = await this.getTemplate();
        }
      
        async getTemplate() {
          const templateResponse = await fetch(this.templateId);
          const templateText = await templateResponse.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(templateText, 'text/html');
          return doc.querySelector('template');
        }
      
        insertSkills(data) {
          data.forEach((item) => {
            const $clone = document.importNode(this.template.content, true);
            $clone.querySelector('use').setAttribute('href', `#${item.icon}`);
            $clone.querySelector('span').textContent = item.name;
            this.fragment.appendChild($clone);
          });
      
          this.container.replaceChildren(this.fragment);
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
      
      const skills = new Skills('skills', 'template.html');
      
      const loadSkillsData = async (url) => {
        try {
          await skills.init();
          const data = await skills.fetchSkillsData(url);
          skills.renderSkills(data, 'frontend');
          skills.renderSkills(data, 'design');
          skills.renderSkills(data, 'platforms');
        } catch (err) {
          console.error(err);
        }
      };
      
      loadSkillsData('skills.json');
      
      
       
      loadSkillsData('/data/skills.json');
      


    SOCIALMEDIA()
    
})