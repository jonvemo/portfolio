export function SKILLS() {
    return fetch('/data/skills.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        const NEW_PARSE = JSON.parse(data.frontend)

        console.log(NEW_PARSE.name)


        
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
  