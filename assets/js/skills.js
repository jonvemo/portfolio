export class Skills {
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

    export const LOADSKILLS = async (url) => {
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
  
  