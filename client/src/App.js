import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = { passwords: [] };

	componentDidMount() {
		this.getPasswords();
	}

	getPasswords = () => {
		fetch('/api/passwords')
			.then(res => res.json())
			.then(passwords => this.setState({ passwords }));
	};

	render() {
		const { passwords } = this.state;

		const mapped = passwords.map((password, key) => <li key={key}>{password}</li>);
		return (
			<div className="App">
				<div className="App-header">
					<h1>5 passwords</h1>
				</div>
				{passwords.length ? (
					<div>
						<ul className="passwords">
							{mapped}
						</ul>
						<button className="more" onClick={this.getPasswords}>Get more</button>
					</div>
				) : (
					<button className="more" onClick={this.getPasswords}>Try again?</button>
				)}
			</div>
		);
	}
}

export default App;
