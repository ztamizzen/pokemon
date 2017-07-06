import { combineReducers } from 'redux';

const Pokemons = (state, action) => {
	switch (action.type) {
		case 'SHOW_ALL_BERRIES':
			console.log('Pokemons reducer', state, action);
			return state;
		default:
			return state || null;
	}
};

const Passwords = (state, action) => {
	switch (action.type) {
		default:
			return state || null;
	}
};

const PokeApp = combineReducers({
	Pokemons,
	Passwords
});

export default PokeApp;