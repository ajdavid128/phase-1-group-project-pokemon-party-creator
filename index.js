//Global variables
const select = document.querySelector('#generations-list');
const partyContainer = document.querySelector('#selected-pokemon');
const removeBtn = document.querySelector('#refreshButton');
const partyDisplayText = document.querySelector('h2');
const pokemonButton = document.createElement('button');
const pokemonContainer = document.querySelector('#pokemon-container');
const header = document.querySelector('header');
const form = document.querySelector('form');
const submitContainer = document.querySelector('#submitted-form');
const formButton = document.querySelector('#submit-party');
const infoContainer = document.querySelector('#info-container');
const refreshButton = document.querySelector('#refresh-page');
const formArray = [];
const cardsCounter = [];


// CSS styling & appending
refreshButton.style.display = 'none';
infoContainer.style.display = 'none';
formButton.style.display = 'none';
partyDisplayText.style.display = 'none';
pokemonButton.textContent = "Generate Pokemon";
pokemonButton.style.margin = '0 auto';
pokemonButton.style.display = 'block';
header.appendChild(pokemonButton);


//Click Event -> Render Sprites to Page
pokemonButton.addEventListener('click', () => {
    
    pokemonButton.style.display = 'none';
    //Fetch to grab 151 Pokemon
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(response => response.json())
    .then(data => {
        renderNames(data);
    })

    function renderNames(oneName){

        oneName.results.forEach(element => {    
        const name = document.createElement('p');
        name.innerText = element.name

        fetchPokemonNames(name.innerText);
    
        
       })
   }
   
   function fetchPokemonNames(name) {

        //Fetch to grab sprites 
       fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
       .then(resp => resp.json())
       .then(data => {

            const img = document.createElement('img');
            img.src = data.sprites.front_default;
                
                //Click to select sprites and append to "Party Container"
                img.addEventListener('click', (e) => {
                    
                    formButton.style.margin = '0 auto';

                    if(partyContainer.children.length < 6){
                        fetchSprites(name);       
                    }

                }) 

            pokemonContainer.appendChild(img);    
       })
       
   }
})




//Get sprites info
function fetchSprites(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(res => res.json())
    .then(data => (renderSprites(data)));
}



//Render sprites
function renderSprites(eachSprite){

    const cards = document.createElement('div');
    const spriteImage = document.createElement('img');
    const spriteName = document.createElement('h3');
    cards.classList = 'card';
    
        
    spriteImage.src = eachSprite.sprites.front_default;
    spriteName.textContent = eachSprite.name;

   
    spriteImage.style.display = 'block';
    spriteImage.style.marginLeft = 'auto';
    spriteImage.style.marginRight = 'auto';
    spriteImage.style.width = '50';

    
         
    formArray.push(cards);
    cards.append(spriteName, spriteImage);
    partyContainer.appendChild(cards);
    
    cardsCounter.push(cards);
    if(cardsCounter.length >= 1) {

        formButton.style.display = 'block';
        
    }

}


//submit form stuff
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formArray.forEach(element => {
        const submitDiv = document.createElement('div');
        const arrayItemText = document.createElement('h4');
        const arrayItemImg = document.createElement('img');
        

        arrayItemText.innerText = element.childNodes[0].innerText
        arrayItemImg.src = element.childNodes[1].src
        submitDiv.classList = 'submitDiv'

        arrayItemImg.style.display = 'block';
        arrayItemImg.style.marginLeft = 'auto';
        arrayItemImg.style.marginRight = 'auto';
        arrayItemImg.style.width = '50';

        submitDiv.append(arrayItemText, arrayItemImg);
        submitContainer.append(submitDiv)

        const infoImg = document.createElement('img');
        submitDiv.addEventListener('mouseover', () => {
            
            infoContainer.style.display = 'block';
            
        })

        submitDiv.addEventListener('mouseout', () => {
            
            infoContainer.style.display = 'none';
            
        })

        fetchDescription(element.childNodes[0].innerText);
       
        
    });

    formButton.remove(); 

    submitContainer.style.display = 'flex';
    partyContainer.style.display = 'none';
    refreshButton.style.display = 'block';
})

refreshButton.addEventListener('click', () => {

    location.reload();
})



function fetchDescription(name) {

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    .then(resp => resp.json())
    .then(data => {
        const li = document.createElement('li');
       

        li.innerText = data.flavor_text_entries[0].flavor_text;
        console.log(li);

        
        infoContainer.appendChild(li);

    })
    
}
       
        

