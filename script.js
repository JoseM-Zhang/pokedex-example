const pokedex = document.getElementById("pokedex");
function pokemonFetch() {
    const promises = [];
    for( let i = 1; i <= 150; i++){ 
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    }
    Promise.all(promises).then(results => {
        const pokemon = results.map( (data) =>({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name)
                            .join(', ')
        }));
        pokemonDisplay(pokemon);
    });
}

const pokemonDisplay = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(pokemon => `
    <li class="card">
        <img class="card-img" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id} - ${pokemon.name}</h2>
        <p class="card-type">Type: ${pokemon.type}</p>
    </li>
    `).join("");
    pokedex.innerHTML = pokemonHTMLString;
};

pokemonFetch();