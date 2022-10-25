//Global variables
const select = document.querySelector('#generations-list');
const partyContainer = document.querySelector('#selected-pokemon');
const form = document.querySelector('#generations-form');
const submitButton = document.createElement('button');
const removeBtn = document.querySelector('#removeButton');
let submitCounter = 0;
let namesCounter = 0;


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

        //Assign a number to each name
        if(namesCounter <= 151) {

            namesCounter++;
            options.innerText = `${namesCounter}. ${element.name}`
           
        }
        
        options.value = element.name;
        options.classList = 'dropdown-value'
    
        select.appendChild(options);
        }) 

    form.append(submitButton);   
}

//Get sprites info
function fetchSprites(name){

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(res => res.json())
    .then(data => (renderSprites(data)));
}

//Render sprites
function renderSprites(eachSprite){

    const spriteImage = document.createElement('img');
    const spriteName = document.createElement('h3');
    const removeButton = document.createElement('button');

    spriteImage.src = eachSprite.sprites.front_default;
    spriteName.textContent = eachSprite.name;
    removeButton.textContent = 'Return';
    removeButton.classList = 'removeButton';

    removeButton.addEventListener('click', (e) => {

        spriteImage.remove()
        spriteName.remove()
        removeButton.remove()        
        
    })
           
    partyContainer.append(spriteName, spriteImage, removeButton);

}

//Form Submission
form.addEventListener('submit', (e) =>{

    e.preventDefault();
    fetchSprites(e.target['generations-list'].value);
    form.reset();
  
})

//Assigning a value to the submit button
submitButton.innerText = 'I Choose You!'

//Submit button even listener
submitButton.addEventListener('click', (e) => {

    if(e.type) {

        ++submitCounter;
        
        if(submitCounter === 6){
    
            submitButton.style.display = 'none'        
    
        }
    }

});


//invoke function
getGenOneNames();



