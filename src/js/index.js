const pkmnDivlist = document.querySelectorAll("div.square-pkmn");
const display = document.querySelectorAll("div.display");
//const img = document.createElement("img");
//const imgg = document.createElement("img");
// array of images
var images = [];
const startGameButton = document.querySelector("#startGameButton");
const attackButton = document.querySelector("#attackButton");
const lifeContainer = document.querySelectorAll("div.life-container");
const lifeBar = document.querySelectorAll(".life-container .life");
let life = 100;

// todo
// refactorizar codigo
// poner barra de vida en la izquierda quizas importando el archivo js de codepen
// ponerle nombres de pokemon debajo

const getRandomNumber = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

const generatePokemonIds = () => {
  const arr = [];
  while (arr.length < 12) {
    const r = getRandomNumber(1, 490);
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr;
};

// fetch pokemons de la api
const getPokemonData = (id) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json())
    .then(pokemonData => pokemonData);
};
/*
const getPokemonName = (id) => { // Ponerle el nombre tambien
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json())
    .then(pokemonData => pokemonData.name); // console.log(JSON.stringify(pokemonData.sprites.front_default)) aqui tienes la imagen frontal
};

*/

var createImage = (src, height, width) =>{
  var img   = new Image();
  img.src   = src;
  img.height = height;
  img.width = width;
  return img; 
};



const functionBigPkmn = async(pokemonListIds) => { // se sobreescribe la imagen

  for (let i = 0; i<pokemonListIds.length; i+=6){
    const pokemonData = await getPokemonData(pokemonListIds[i]);
    const pokemonPhoto = pokemonData.sprites.other["official-artwork"].front_default;
    const img = createImage(pokemonPhoto, "250", "250");
    const pokemonContainer = display[i/6];
    const oldImage = pokemonContainer.querySelector("img");
    if(oldImage){
      oldImage.remove();
    }
    display[i/6].appendChild(img);
  }

};

const functionLittlePkmn = (pokemonListIds) => {
  pokemonListIds.forEach(async(element, index) => {
    const pokemonData = await getPokemonData(element);
    const pokemonPhoto = pokemonData.sprites.front_default;
    const pic = createImage(pokemonPhoto, "96", "96");
    const pokemonContainer = pkmnDivlist[index];
    const oldImage = pokemonContainer.querySelector("img");
    if(oldImage){
      oldImage.remove();
    }
    pkmnDivlist[index].appendChild(pic);
  });
};

const attack = () => {
  /*
  var imag = createImage("https://w7.pngwing.com/pngs/812/775/png-transparent-x-logo-organization-video-youtube-human-trafficking-advertising-red-cross-background-angle-business-red.png", "96", "96");
  var imag2 = createImage("https://w7.pngwing.com/pngs/812/775/png-transparent-x-logo-organization-video-youtube-human-trafficking-advertising-red-cross-background-angle-business-red.png", "96", "96");
*/
  const lifeDecrease = getRandomNumber(0, 10);
  life -= lifeDecrease;
  lifeBar.forEach((element)=>{
    element.style.setProperty("--life", `${life}%`);
  });
  console.log(life);
  if (life <= 90){
    /*
    imag.style.position = "relative";
    imag.style.top = "-97px";
    imag2.style.position = "relative";
    imag2.style.top = "-97px";
    pkmnDivlist[4].appendChild(imag);
    pkmnDivlist[5].appendChild(imag2);
    //var imag2 = createImage("https://w7.pngwing.com/pngs/812/775/png-transparent-x-logo-organization-video-youtube-human-trafficking-advertising-red-cross-background-angle-business-red.png", "96", "96");
 */
  }

};

const setDefaultProperties = () => {
  life = 100;
  lifeBar.forEach((element)=>{
    element.style.setProperty("--life", `${life}%`);
  });
  lifeContainer.forEach((element)=>{
    element.removeAttribute("hidden");
  });
  attackButton.removeAttribute("disabled");
 /* display[].removeChild(img);*/
};

const startGame = () => { // ocultar barra de vida al principio
  setDefaultProperties();
  const pokemonListIds = generatePokemonIds();
  functionBigPkmn(pokemonListIds);
  functionLittlePkmn(pokemonListIds);
};

startGameButton.addEventListener("click", startGame);
attackButton.addEventListener("click", attack);

// cuando se gaste la vida, ponerle una cruz a ese pokemon y lanzar el otro
