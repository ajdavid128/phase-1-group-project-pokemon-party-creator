//GLOBAL VARIABLES

//QUERY SELECTION
const select = document.querySelector('#generations-list');
const partyContainer = document.querySelector('#selected-pokemon');
const removeBtn = document.querySelector('#refreshButton');
const pokemonContainer = document.querySelector('#pokemon-container');
const header = document.querySelector('header');
const form = document.querySelector('form');
const submitContainer = document.querySelector('#submitted-form');
const formButton = document.querySelector('#submit-party');
const infoContainer = document.querySelector('#info-container');
const refreshButton = document.querySelector('#refresh-page');
const descriptionDiv = document.querySelector('#description');

//CREATED ELEMENTS
const pokemonButton = document.createElement('button');
const descriptionP = document.createElement('p');

//EMPTY ARRAYS
const formArray = [];
const cardsCounter = [];
const infoArray = [];

//BUTTON & TAG Attributes
pokemonButton.id = 'gen-btn';
formButton.id = 'form-btn';
refreshButton.id = 'refresh-btn';
descriptionP.id = "description-p";

// CSS STYLING & APPENDING
refreshButton.style.display = 'none';
infoContainer.style.display = 'none';
formButton.style.display = 'none';
pokemonButton.textContent = "Generate Pokemon";
pokemonButton.style.margin = '0 auto';
pokemonButton.style.display = 'block';

header.appendChild(pokemonButton);

//Click Event -> Render Sprites to Page
pokemonButton.addEventListener('click', () => {
    pokemonButton.style.display = 'none';
    descriptionDiv.style.display = 'none';

    //Fetch to grab 151 Pokemon
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(response => response.json())
    .then(data => {
        renderNames(data);
    });

    function renderNames(oneName){
        oneName.results.forEach(element => {    
        const name = document.createElement('p');
        name.innerText = element.name;
        fetchPokemonNames(name.innerText);
       });
   };
   
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
                    };
                });  
            pokemonContainer.appendChild(img);    
       });
   };
});

//Get sprites info
function fetchSprites(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(res => res.json())
    .then(data => {
        renderSprites(data);
    });
};

//Render sprites
function renderSprites(eachSprite){
    
    const card = document.createElement('div');

    card.setAttribute('pokemonName', eachSprite.name);
    const spriteImage = document.createElement('img');

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
    };
};

//submit form stuff
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formArray.forEach(element => {
        const submitDiv = document.createElement('div');

        let name = element.getAttribute('pokemonname');
       
        submitDiv.setAttribute('pokemonName', name);

        const arrayItemText = document.createElement('h3');
        const arrayItemImg = document.createElement('img');

        arrayItemText.innerText = element.childNodes[0].innerText;
        arrayItemImg.src = element.childNodes[1].src;
        submitDiv.classList = 'submitDiv';

        arrayItemImg.style.display = 'block';
        arrayItemImg.style.marginLeft = 'auto';
        arrayItemImg.style.marginRight = 'auto';
        arrayItemImg.style.width = '50';

        submitDiv.append(arrayItemText, arrayItemImg);
        submitContainer.append(submitDiv);

        const infoImg = document.createElement('img');

        submitDiv.addEventListener('mouseover', (e) => {
            infoContainer.style.display = 'block';
            pokemonContainer.style.display = 'none';
        });
        infoArray.push(element.childNodes[0].innerText);
        fetchDescription(arrayItemText.innerText);
    }); 
    formButton.remove(); 
    submitContainer.style.display = 'flex';
    partyContainer.style.display = 'none';
    refreshButton.style.display = 'block';   
});

//Pick New Pokemon Event
refreshButton.addEventListener('click', () => {
    location.reload();
});

function fetchDescription(name) {

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    .then(resp => resp.json())
    .then(data => {

        const descriptli = document.createElement('li');
        const nameSpan = document.createElement('span');
        const descriptionSpan = document.createElement('span');

        descriptli.id = `${name}`;
        descriptli.classList = 'flavor-text';

        nameSpan.innerText = `${name[0].toUpperCase()}${name.slice(1,name.length)}:`;
        descriptionSpan.innerText = ` ${data.flavor_text_entries[0].flavor_text}`;

        nameSpan.style.color = '#ffde00';
        nameSpan.style.textDecoration = 'underline';

        descriptli.append(nameSpan, descriptionSpan);
        infoContainer.appendChild(descriptli);
    });    
};