//Global variables
const select = document.querySelector('#generations-list');


//Get generation names
function getGenOneNames(){
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(response => response.json())
    .then(data => renderNames(data))
}

//Render the generation names
function renderNames(oneName){
    
    //Assign the first dropdown to blank and append it
    const blankSpace = document.createElement('option')
    blankSpace.textContent = '';
    select.appendChild(blankSpace);

    //Iterate through the generation names and append them to the dropdown
    oneName.results.forEach(element => {
    
        const options = document.createElement("option");
        options.textContent = element.name
        options.value = element.name
        select.appendChild(options);

        })    
}

//invoke function
getGenOneNames()