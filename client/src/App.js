import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	NavLink,
	Redirect,
	Switch
} from 'react-router-dom';

import { Quotes } from './Quote';
import { Passwords } from './Passwords';
import { Pokemons } from './pokemons/Pokemons';
import { Gallery } from './Gallery';
import './App.css';

class App extends Component {
	state = { quote: [], title: "5 passwords &amp; Pokemons" };

	componentDidMount() {
		this.getQuote();
	}

	getQuote = () => {
		fetch('/api/quote')
			.then(res => res.json())
			.then(quote => this.setState({ quote }));
	};

	render() {
		const { quote } = this.state;
		return (
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

					{ quote.length ? (
						<footer className="App-foot">
							<Quotes quotes={quote} />
							<button className="other-quote" onClick={this.getQuote}>Another</button>
						</footer>
					) : (
						<footer className="App-foot">
							<p>Quoteless online</p>
							<button className="other-quote" onClick={this.getQuote}>Try to load another</button>
						</footer>
					)}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
