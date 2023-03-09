
const header = document.querySelector('header');

const generatePokemon = document.createElement('button');

generatePokemon.id = 'gen-poke';


header.appendChild(generatePokemon);

generatePokemon.addEventListener('click', () => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
    .then(res => res.json())
    .then(data => console.log(data));
});
