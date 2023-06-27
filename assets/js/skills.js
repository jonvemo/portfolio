export function SKILLS() {
    return fetch('/data/skills.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const NEW_JSON = data
        const NEW_PARSE = JSON.parse(NEW_JSON)

        console.log(NEW_PARSE.frontend.name)


        
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
  