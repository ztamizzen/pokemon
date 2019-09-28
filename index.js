const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const randomQuote = require('random-quote');
const Pokedex = require('pokedex-promise-v2');
const wiki = require('wikijs').default;
const loripsum = require('loripsum');

const P = new Pokedex();
const app = express();

let pokemon = {
	limit: 10,
	offset: 0
}, convertStringToBoolean = function (query) {
	let keys = Object.keys(query),
		i = 0,
		len = keys.length,
		booleanRegExp = /false|true/;
	for (; i < len; ++i) {
		let key = keys[i],
			value = query[key];
		if (booleanRegExp.test(value)) {
			query[key] = eval(value);
		} else if (!isNaN(Number(value))) {
			query[key] = Number(value);
		}
	}
	return query;
};

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/loripsum', (req, res) => {
	let query = convertStringToBoolean(req.query);
	let url = Object.assign({}, query, {
		paragraphCount: 2,
		ul: true,
		bq: true
	});
	loripsum.html(url).then(slipsum => res.send(slipsum))
		.catch((err) => console.error(err));
});

app.get('/api/wiki/random', (req, res) => {
	wiki().random(1).then(results => wiki().page(results[0])).then(page => res.json(page));
});

app.get('/api/wiki/:page', (req, res) => {
	wiki().page(req.params.page)
		.then(results => results.content())
		.then(content => res.json(content))
		.catch((err) => {
			console.log(25, err);
		});
});

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
		limit: pokemon.limit,
		offset: pokemon.offset
	};
	if (req.query.limit) {
		pokemon.limit = parseInt(req.query.limit, 10);
		interval.limit = pokemon.limit;
	}
	if (req.query.offset) {
		pokemon.offset = parseInt(req.query.offset, 10);
		interval.offset = pokemon.offset;
	}
	console.log('pokemons', interval);
	P.getPokemonsList(interval).then((result) => res.json(result));
});

app.get('/api/pokemon/language/:lang', (req, res) => {
	P.getLanguageByName(req.params.lang)
		.then(function (response) {
			res.json(response);
		})
		.catch(function (error) {
			console.log('There was an ERROR: ', error);
			next(error);
		});
});

app.get('/api/pokemon/:name', (req, res) => {
	P.getPokemonByName(req.params.name).then((pokemon) => res.json(pokemon));
});

app.get('/api/pokemons/endpoints', (req, res) => {
	P.getEndpointsList().then((pokemon) => res.json(pokemon)).catch((err) => {
		res.json(err);
		next(err);
	});
});

app.get('/api/pokemons/berries', (req, res) => {
	P.getBerriesList().then((pokemon) => res.json(pokemon)).catch((err) => {
		res.json(err);
		next(err);
	});
});

app.get('/api/pokemons/berries/:id', (req, res) => {
	P.getBerryByName(req.params.id).then((pokemon) => res.json(pokemon)).catch((err) => {
		res.json(err);
		next(err);
	});
});

app.get('/api/pokemons/pokedex', (req, res) => {
	P.getPokedexsList().then((pokemon) => res.json(pokemon)).catch((err) => {
		res.json(err);
		next(err);
	});
});

app.get('/api/pokemons/pokedex/:id', (req, res) => {
	P.getPokedexByName(req.params.id).then((pokemon) => res.json(pokemon)).catch((err) => {
		res.json(err);
		next(err);
	});
});

app.get('/gallery/*.jpg', (req, res) => {
	let options = {
		root: path.join(__dirname, 'client/public'),
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};
	res.sendFile(req.params.name, options, (err) => {
		if (err) next(err);
		else console.log('Sent file', req.params.name);
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Password generator listening on port: ${port}`);