import React, { Component } from 'react';
import Quote from './Quote';
import './App.css';

class App extends Component {
	state = { passwords: [], quote: [] };

	componentDidMount() {
		this.getPasswords();
		this.getQuote();
	}

	getPasswords = () => {
		fetch('/api/passwords')
			.then(res => res.json())
			.then(passwords => this.setState({ passwords }));
	};

	getQuote = () => {
		fetch('/api/quote')
			.then(res => res.json())
			.then(quote => this.setState({ quote }));
	};

	render() {
		const { passwords, quote } = this.state,
			mapped = passwords.map((password, key) => <li key={key}>{password}</li>),
			quotes = quote.map((quote, idx) => <Quote quote={quote} key={idx} />);

		return (
			<div className="App">
				<div className="App-header">
					<h1>5 passwords</h1>
				</div>
				{passwords.length ? (
					<div className="passwords-wrapper">
						<ul className="passwords">
							{mapped}
						</ul>
						<button className="more" onClick={this.getPasswords}>Nope, others&hellip;</button>
					</div>
				) : (
					<div className="single-button-wrapper">
						<button className="more" onClick={this.getPasswords}>FFS! Try again!</button>
					</div>
				)}
				{ quote.length ? (<footer className="App-foot">
					{quotes}
					<button className="other-quote" onClick={this.getQuote}>Another</button>
				</footer>) : (<footer className="App-foot">
					<p>Quoteless online</p>
					<button className="other-quote" onClick={this.getQuote}>Try to load another</button>
				</footer>)}
			</div>
		);
	}
}

export default App;
