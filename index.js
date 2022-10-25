//Global variables
const select = document.querySelector('#generations-list');
const partyContainer = document.querySelector('#selected-pokemon');
const form = document.querySelector('#generations-form');
const submitButton = document.createElement('button');
const removeBtn = document.querySelector('#removeButton');
const partyDisplayText = document.querySelector('h2');
const pokemonButton = document.createElement('button');
let submitCounter = 0;
let namesCounter = 0;

pokemonButton.textContent = "Generate Pokemon";
document.body.appendChild(pokemonButton);

//Get generation names
function getGenOneNames(){
    
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(response => response.json())
    .then(data => renderNames(data))
}

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

    //Render Sprites to page
    pokemonButton.addEventListener('click', () => {
        // fetch(`https://pokeapi.co/api/v2/pokemon/${options.value}/`)
        //         .then(res => res.json())
        //         .then(data => {
                    const img = document.createElement('img');
                    img.src = eachSprite.sprites.front_default;
                    document.body.appendChild(img);
    })



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
           
    cards.append(spriteName, spriteImage, removeButton);
    partyContainer.appendChild(cards);

}














//Making the partyDisplayText disappear till submission
// partyDisplayText.style.display = 'none';

// //Form Submission
// form.addEventListener('submit', (e) =>{

//     e.preventDefault();
//     partyDisplayText.style.display = 'block'
//     fetchSprites(e.target['generations-list'].value);
//     form.reset();
  
// })

// //Assigning a value to the submit button
// submitButton.innerText = 'I Choose You!'

// //Submit button even listener
// submitButton.addEventListener('click', (e) => {

//     if(e.type) {

//         ++submitCounter;
        
//         if(submitCounter === 6){
    
//             submitButton.style.display = 'none'        
    
//         }
//     }

// });


// submitButton.classList = 'submit-button';




//invoke function
getGenOneNames();



//Render the generation names
function renderNames(oneName){
    
    // //Assign the first dropdown to blank and append it
    // const blankSpace = document.createElement('option')
    // blankSpace.textContent = '';
    // select.appendChild(blankSpace);


    //Iterate through the generation names and append them to the dropdown
    oneName.results.forEach(element => {

    
        // const options = document.createElement("option");

        // //Assign a number to each name
        // if(namesCounter <= 151) {

        //     namesCounter++;
        //     options.innerText = `${namesCounter}. ${element.name}`
           
        // }
        
        //     options.value = element.name;
        //     options.classList = 'dropdown-value'
    
        //     select.appendChild(options);

            // select.addEventListener('mouseover', () => {
            //      fetch(`https://pokeapi.co/api/v2/pokemon/${options.value}/`)
            //     .then(res => res.json())
            //     .then(data => {
            //         const img = document.createElement('img');
            //         img.src = data.sprites.front_default;
            //         document.body.appendChild(img);

            //         console.log(data);
            //     });
                
            // })
        }) 

    // form.append(submitButton);   
}