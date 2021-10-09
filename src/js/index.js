const pkmnDivlist = document.querySelectorAll("div.square-pkmn");
const divie = document.querySelectorAll("div.display");
const img = document.createElement("img");
const startGameButton = document.querySelector("#startGameButton");
// todo
// refactorizar codigo
// poner barra de vida en la izquierda quizas importando el archivo js de codepen
// ponerle nombres de pokemon debajo

const randomIntFromInterval = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

const generatePokemonIds = () => {
  const arr = [];
  while (arr.length < 12) {
    const r = randomIntFromInterval(1, 490);
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
const functionBigPkmn = async(pokemonListIds) => {
  const pkmnphot0 = await getPokemonData(pokemonListIds[0]);
  const pokemonPhoto0 = pkmnphot0.sprites.other["official-artwork"].front_default;

  const pkmnphot6 = await getPokemonData(pokemonListIds[6]);
  const pokemonPhoto6 = pkmnphot6.sprites.other["official-artwork"].front_default;

  divie[0].innerHTML = `<img height= "250" width= "250" src= ${pokemonPhoto0}>`;
  divie[1].innerHTML = `<img height= "250" width= "250" src= ${pokemonPhoto6}>`;
};

const functionLittlePkmn = async(pokemonListIds) => {
  for (const index in pokemonListIds) {
    const pokemonData = await getPokemonData(pokemonListIds[index]);
    const pokemonPhoto = pokemonData.sprites.front_default;
    pkmnDivlist[index].innerHTML = `<img src= ${pokemonPhoto}>`;
  }
};

const startGame = () => {
  const pokemonListIds = generatePokemonIds();
  functionBigPkmn(pokemonListIds);
  functionLittlePkmn(pokemonListIds);
};

startGameButton.addEventListener("click", startGame);
