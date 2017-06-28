const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const randomQuote = require('random-quote');
const Pokedex = require('pokedex-promise-v2');

const P = new Pokedex();
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/passwords', (req, res) => {
	const count = 5;
	const passwords = Array.from((new Array(count)).keys()).map(i => generatePassword(12, false));
	res.json(passwords);
	console.log(`Sent ${count} passwords`);
});

app.get('/api/quote', (req, res) => {
	randomQuote()
		.then(quote => res.json(quote))
		.catch(err => console.log(err));
});

app.get('/api/pokemons', (req, res) => {
	let interval = {
		limit: 10,
		offset: 0
	};
	if (req.query.offset) {
		interval.offset = parseInt(req.query.offset, 10);
	}
	if (req.query.name) {
		console.log(req.query.name);
		P.getPokemonByName(req.query.name).then((pokemon) => res.json(pokemon));
	} else {
		P.getPokemonsList(interval).then((result) => res.json(result));
	}

});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Password generator listening on port: ${port}`);