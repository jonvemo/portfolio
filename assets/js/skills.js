export class Skills {
    constructor(containerId, templateId) {
      this.container = document.getElementById(containerId);
      this.template = document.querySelector(templateId).content;
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
        const $clone = document.importNode(this.template, true);
        $clone.querySelector('use').setAttribute('href', `#${item.icon}`);
        $clone.querySelector('span').textContent = item.name;
        this.fragment.appendChild($clone);
      });
    }
  
    async renderSkills(data, key) {
      try {
        const skillsData = data[key] || [];
        this.insertSkills(skillsData);
      } catch (err) {
        console.error(err);
      }
    }
  }
  