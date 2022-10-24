//Global variables
const select = document.querySelector('#generations-list');
const partyContainer = document.querySelector('#selected-pokemon');
const form = document.querySelector('#generations-form');

const submitButton = document.createElement('button');
submitButton.innerText = 'I Choose You!'

//Get generation names
function getGenOneNames(){
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(response => response.json())
    .then(data => renderNames(data))
}

function fetchSprites(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(res => res.json())
    .then(data => (renderSprites(data)));
}

function renderSprites(eachSprite){
    const spriteImage = document.createElement('img');
    const spriteName = document.createElement('h3');

    spriteImage.src = eachSprite.sprites.front_default;
    spriteName.textContent = eachSprite.name;

    partyContainer.append(spriteImage)
    partyContainer.append(spriteName)
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
        // let pokemonNumber = 0
        // for(let i = pokemonNumber; i < 152; i++){
        //     // ++pokemonNumber
        //     options.textContent = `${i} ${element.name}`
        // }
        options.textContent = element.name;
        options.value = element.name;
        options.classList = 'dropdown-value'
    
        select.appendChild(options);
        }) 

    form.append(submitButton);   
}

//Submit Button Listener
submitButton.addEventListener('click', (e) => {
    console.log(e.type)
    // 
    let submitCounter = 0
        if(submitCounter < 6){
            ++submitCounter
            submitButton.style.display = 'block';
        } else {
            
        }
})
submitButton.style.display = 'none';


//Form Submission
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    fetchSprites(e.target['generations-list'].value);
    // console.log(e.target['generations-list'].value)
})






//invoke function
getGenOneNames()


// function selectedPartyPokemon(eachPokemon){

// }