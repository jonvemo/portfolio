export function SKILLS() {
    return fetch('/data/skills.json')
    .then(response => response.json())
    .then(data => {
        
        const SKILLS = data.frontend.map(item => item.name);
        

        console.log(SKILLS)



        
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
  