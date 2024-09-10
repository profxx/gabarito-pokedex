const limit = 100;
const offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
const pokemonList = document.getElementById("pokemonList");

function getTypesLi(types){
    return `
        <div class="type ${types.type.name}">${types.type.name}</div>
    `
}

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.types[0].type.name}">
        <div class="number">#${pokemon.id}</div>
        <h4 class="name">${pokemon.name}</h4>
        <div class="detail">
            <div class="types">
                ${pokemon.types.map(getTypesLi).join("")}
            </div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="Pokemon">
        </div>
   
    </li>
    `
}

function getPokemonDetails(pokemon){
    return fetch(pokemon.url)
        .then((response) => response.json());
}

fetch(url)
    .then((response) => response.json())
    .then((listaPokemons) => listaPokemons.results)
    .then((list) => list.map(getPokemonDetails))
    .then((details) => Promise.all(details))
    .then((newList) => pokemonList.innerHTML = newList.map(convertPokemonToLi).join(""))
    .catch((error) => console.log(error));














