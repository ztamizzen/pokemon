const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const http = require('http');

// P.getAbilitiesList().then((response) => console.log(response));

(function () {

}());

http.get('http://loripsum.net/api/10/short/headers', (res) => {
	const { statusCode, headers } = res;
	console.log(statusCode, headers['content-type']);
	if (statusCode !== 200) {
		res.resume();
		return;
	}

	res.setEncoding('utf8');
	let rawData = '';
	res.on('data', (chunk) => {
		rawData += chunk;
	});
	res.on('end', () => {

	});
}).on('error', (e) => console.error(e));
