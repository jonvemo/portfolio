export class Skills {
    constructor(skills, containerId, templateId) {
      this.skills = skills;
      this.container = document.getElementById(containerId);
      this.template = document.getElementById(templateId).content;
      this.fragment = document.createDocumentFragment();
    }
  
    // Método para insertar habilidades en el DOM
    insertSkills() {
      skills.forEach((el, i) => {
        const LINK = skills[i];
        template.querySelector('use').setAttribute('href', `#${el.toLowerCase()}`);
        template.querySelector('span').textContent = `${el}`;
        let $clone = document.importNode(template, true);
        fragment.appendChild($clone);
      });
  
      container.replaceChildren(fragment);
    }
  
    // Método para obtener una lista de habilidades
    getSkillList() {
      return skills.map(skill => skill.name);
    }
  }
  