const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

P.getAbilitiesList().then((response) => console.log(response));
