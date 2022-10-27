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
const descriptionDiv = document.querySelector('#description');
const descriptionP = document.createElement('p');
descriptionP.id = "description-p"



const tempStorage = document.querySelector('#temp-storage');

const descriptionStorage = document.createElement('div');
descriptionStorage.id = 'description-storage';
tempStorage.appendChild(descriptionStorage);


const formArray = [];
const cardsCounter = [];
const infoArray = [];

// Button Attributes
pokemonButton.id = 'gen-btn'
formButton.id = 'form-btn'
refreshButton.id = 'refresh-btn'


// CSS styling & appending
refreshButton.style.display = 'none';
infoContainer.style.display = 'none';
formButton.style.display = 'none';
partyDisplayText.style.display = 'none';
pokemonButton.textContent = "Generate Pokemon";
pokemonButton.style.margin = '0 auto';
pokemonButton.style.display = 'block';
header.appendChild(pokemonButton);

tempStorage.style.display = 'none';


//Click Event -> Render Sprites to Page
pokemonButton.addEventListener('click', () => {
    
    pokemonButton.style.display = 'none';
    descriptionDiv.style.display = 'none';
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
    .then(data => {

        renderSprites(data)
        // console.log(data)
    });
}



//Render sprites
function renderSprites(eachSprite){
    
    const card = document.createElement('div');

    card.setAttribute('pokemonName', eachSprite.name)
    const spriteImage = document.createElement('img');

    // console.log(card)
    const spriteName = document.createElement('h3');
    card.classList = 'card';
        
    spriteImage.src = eachSprite.sprites.front_default;
    spriteName.textContent = eachSprite.name;

    spriteImage.style.display = 'block';
    spriteImage.style.marginLeft = 'auto';
    spriteImage.style.marginRight = 'auto';
    spriteImage.style.width = '50';
         
    formArray.push(card);
    card.append(spriteName, spriteImage);
    partyContainer.appendChild(card);
    
    cardsCounter.push(card);
    if(cardsCounter.length >= 1) {

        formButton.style.display = 'block';
        
    }

}


//submit form stuff
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formArray.forEach(element => {
        const submitDiv = document.createElement('div');

        let name = element.getAttribute('pokemonname')

       
        submitDiv.setAttribute('pokemonName', name)

        const arrayItemText = document.createElement('h3');
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
        submitDiv.addEventListener('mouseover', (e) => {
            // console.log(e.currentTarget);
            infoContainer.style.display = 'block';

            // const finalLi = document.createElement('li');
            // finalLi.textContent = 

            // infoContainer.append(finalLi)
            pokemonContainer.style.display = 'none';
        })

        infoArray.push(element.childNodes[0].innerText);

        fetchDescription(arrayItemText.innerText)
    });

    
    formButton.remove(); 

    // partyDisplayText.style.display = 'block';
    submitContainer.style.display = 'flex';
    partyContainer.style.display = 'none';
    refreshButton.style.display = 'block';
    

    // partyDisplayText.appendChild(header)
})


refreshButton.addEventListener('click', () => {
    location.reload();
})


// infoArray.forEach(element => {
//     fetchDescription(element);
// })



function fetchDescription(name) {

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    .then(resp => resp.json())
    .then(data => {

        const descriptli = document.createElement('li');
        descriptli.id = `${name}`
        descriptli.classList = 'flavor-text'
        descriptli.innerText = `${name[0].toUpperCase()}${name.slice(1,name.length)}: ${data.flavor_text_entries[0].flavor_text}`;

        console.log(descriptli.innerText)
        // console.log(descriptli);

        infoContainer.appendChild(descriptli);

        //nidorino, zubat, caterpie's description are in Japanese/Chinese
        //rattata

        // Grabbing Flavor Text First Word
        // const flavorTextName = descriptli.innerText.split(' ')[0]
        // console.log(flavorTextName);
        // for(let i = 0; i < flavorTextName.length; i++){
            
        //         console.log(flavorTextName[i])
            
        // }
        
        // test.push(flavorTextName)
        // flavorTextName.style.color = "red";

    })
    
}
// Trying to add styling to first word in flavor text
// let test = []
// console.log(test)
// test.forEach(element => {
//     element.style.textColor = 'red';
// })

// descriptionP.textContent = `Welcome to Pokémon Party Creator! 

// Here we have created a fun little experience for every Pokémon lover out there. In this simple application you can view and select your Pokémon dream team. Below you will find directions on how to navigate this webpage:

// Step #1: Select the “Generate Pokémon'' button. 
// This will display all 151 Pokémon from the first generation. 

// Step #2:  Look through all the Pokémon sprites and pick your 6 favorites. 
// When you select a Pokemon it will jump into your “Pokémon Party”. 

// Step #3: When you have selected your 6 Pokémon hit the submit button to confirm your party.

// Step #4: Hover the Pokéball cursor over the Pokémon and an information box will appear containing descriptions about each member of your party.

// Step #5: Do it all again! At the bottom of the page there will be a “Pick New Party” button that will bring you back to Step #1.

// Thanks for stopping by and have fun! `;

// descriptionDiv.append(descriptionP);