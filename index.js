const select = document.querySelector('#generations-list')

function getGenOneNames(){
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(response => response.json())
    .then(data => renderNames(data))
}
getGenOneNames()

function renderNames(oneName){
    oneName.results.forEach(element => {
        const options = document.createElement("option")
        options.textContent = element.name
        options.value = element.name
        select.appendChild(options)

        })
   
}