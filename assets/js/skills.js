export class Skills {
    constructor(containerId, templateId) {
      this.container = document.getElementById(containerId)
      this.template = document.getElementById(templateId).content
      this.fragment = document.createDocumentFragment()
    }
  
    async fetchSkillsData() {
      const response = await fetch('/data/skills.json');
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    }
    
    
}
