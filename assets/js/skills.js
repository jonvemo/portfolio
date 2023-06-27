export class Skills {
    constructor(skills, containerId, templateId) {
      this.skills = skills;
      this.container = document.getElementById(containerId);
      this.template = document.getElementById(templateId).content;
      this.fragment = document.createDocumentFragment();
    }
  
    // Método para insertar habilidades en el DOM
    insertSkills() {
      this.skills.forEach((el, i) => {
        const LINK = this.skills[i];
        this.template.querySelector('use').setAttribute('href', `#${el.toLowerCase()}`);
        this.template.querySelector('span').textContent = `${el}`;
        let $clone = document.importNode(this.template, true);
        this.fragment.appendChild($clone);
      });
  
      this.container.replaceChildren(this.fragment);
    }
  
    // Método para obtener una lista de habilidades
    getSkillList() {
      return this.skills.map(skill => skill.name);
    }
  }
  