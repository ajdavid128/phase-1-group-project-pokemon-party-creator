//Global variables
const select = document.querySelector('#generations-list');
const partyContainer = document.querySelector('#selected-pokemon');
const form = document.querySelector('#generations-form');
let submitCounter = 0;

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
    const removeButton = document.createElement('button');

    spriteImage.src = eachSprite.sprites.front_default;
    spriteName.textContent = eachSprite.name;
    removeButton.textContent = 'Return';
    removeButton.classList = 'removeButton';

    function removeFunction() {

        removeButton.addEventListener('click', (e) => {

            let removeCounter = 0;

            if(e.type) {

                removeCounter++;
            }

            spriteImage.remove()
            spriteName.remove()
            removeButton.remove()
        })

    }
    

 
    partyContainer.append(spriteName, spriteImage, removeButton);
    // partyContainer.append(spriteName)
    
    
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

        options.textContent = element.name;
        options.value = element.name;
        options.classList = 'dropdown-value'
    
        select.appendChild(options);
        }) 

    form.append(submitButton);   
}



submitButton.addEventListener('click', (e) => {

    if(e.type) {
        ++submitCounter;
        
        if(submitCounter === 6){
            submitButton.style.display = 'none'
        }
    }
    // add removal and set submitCounter--
        
})

//Form Submission
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    fetchSprites(e.target['generations-list'].value);
    // console.log(e.target['generations-list'].value)
})






//invoke function
getGenOneNames()



// submitCounter ++ = 6 == dispapears
// removeCounter ++ 3 


// submitButton - removeButton = 3

// 3 = how many sumbit could be hit before disappearing 



