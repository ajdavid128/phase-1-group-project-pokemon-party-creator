//Global variables
const select = document.querySelector('#generations-list');
const partyContainer = document.querySelector('#selected-pokemon');
const removeBtn = document.querySelector('#removeButton');
const partyDisplayText = document.querySelector('h2');
const pokemonButton = document.createElement('button');
const pokemonContainer = document.querySelector('#pokemon-container');
const header = document.querySelector('header');
const form = document.querySelector('form');
const submitContainer = document.querySelector('#submitted-form');
const formButton = document.querySelector('#submit-party');




//FIX THE RETURN BUTTON ISSUE WITH SUBMIT






const array = [];

submitContainer.style.display = 'none'

//Counter for party clicks:
let selectPartyCounter = 0;


//Generate Pokemon Button
partyDisplayText.style.display = 'none';
pokemonButton.textContent = "Generate Pokemon";
header.appendChild(pokemonButton);


//Click Event -> Render Sprites to Page
pokemonButton.addEventListener('click', () => {
    

    //Fetch to grab 151 Pokemon
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(response => response.json())
    .then(data => {
        console.log(data);
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
    const removeButton = document.createElement('button');
   
    cards.classList = 'card';

    spriteImage.src = eachSprite.sprites.front_default;
    spriteName.textContent = eachSprite.name;



    // Design for remove button
    removeButton.textContent = 'Return';
    removeButton.classList = 'removeButton';
    removeButton.style.backgroundColor = "#3B4CCA";
    removeButton.style.display = 'inline-block';
    removeButton.style.padding = ' 0.3em 1.2em';
    removeButton.style.margin = '0 0.1em 0.1em 0';
    removeButton.style.border = "0.16em solid rgba(255,255,255,0)";
    removeButton.style.borderRadius = '2em';
    removeButton.style.boxSizing = 'border-box';
    removeButton.style.textDecoration = 'none';
    removeButton.style.fontFamily = 'Roboto, sans-serif';
    removeButton.style.fontWeight = '500';
    removeButton.style.color = '#FFFFFF';
    removeButton.style.textShadow = '0 0.04em 0.04em rgba(0,0,0,0.35)';
    removeButton.style.textAlign = 'center';
    removeButton.style.transition = 'all 0.2s';


   
    spriteImage.style.display = 'block';
    spriteImage.style.marginLeft = 'auto';
    spriteImage.style.marginRight = 'auto';
    spriteImage.style.width = '50';

    removeButton.addEventListener('click', (e) => {

        spriteImage.remove()
        spriteName.remove()
        removeButton.remove()        
        cards.remove();
    })
         
    array.push(cards);
    cards.append(spriteName, spriteImage, removeButton);
    partyContainer.appendChild(cards);

}
console.log(array);



//submit form stuff

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    array.forEach(element => {
        const submitDiv = document.createElement('div');
        const arrayItemText = document.createElement('h4');
        const arrayItemImg = document.createElement('img');

        arrayItemText.innerText = element.childNodes[0].innerText
        arrayItemImg.src = element.childNodes[1].src
        submitDiv.classList = 'submitDiv'

        submitDiv.append(arrayItemText, arrayItemImg);
        submitContainer.append(submitDiv)

    });
    submitContainer.style.display = 'flex';
    partyContainer.style.display = 'none';
})