const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/passwords', (req, res) => {
	const count = 5;
	const passwords = Array.from((new Array(count)).keys()).map(i => generatePassword(12, false));
	res.json(passwords);
	console.log(`Sent ${count} passwords`);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Password generator listening on port: ${port}`);