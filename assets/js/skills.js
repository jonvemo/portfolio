export function SKILLS() {
    return fetch('/data/skills.json')
    .then(response => response.json())
    .then(data => {
        let json = '{"nombre": "Juan", "edad": 25, "ciudad": "Madrid"}';
        let objeto = JSON.parse(json);
        console.log(objeto.nombre)

        console.log(data)
        console.log(data.frontend)
        
        const NEW_PARSE = JSON.parse(data)

        console.log(NEW_PARSE.name)



        
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
  