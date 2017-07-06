import React from 'react';
import {
	BrowserRouter,
	Route,
	NavLink,
	Redirect,
	Switch
} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PokeApp  from './reducers';

import { Quotes } from './Quote';
import { Passwords } from './passwords/Passwords';
import { Pokemons } from './pokemons/Pokemons';
import { Gallery } from './gallery/Gallery';
import './App.css';

const store = createStore(PokeApp);

const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<div className="App">
				<div className="App-header">
					<h1>5 passwords &amp; Pokemons</h1>
				</div>

				<nav>
					<NavLink to="/pokemons">Pokemons</NavLink>
					<NavLink to="/passwords">Passwords</NavLink>
				</nav>

				<main className="content">
					<Switch>
						<Route path="/pokemons" component={Pokemons} />
						<Route path="/passwords" component={Passwords} />
						<Route path="/gallery" component={Gallery} />
						<Redirect to="/pokemons" />
					</Switch>
				</main>

				<footer className="App-foot">
					<Quotes />
				</footer>
			</div>
		</BrowserRouter>
	</Provider>
);

export default App;
