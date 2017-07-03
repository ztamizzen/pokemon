import React, { Component } from 'react';

export class Berries extends Component {
	state = { berries: [] };

	componentDidMount() {
		this.getBerries();
	}

	getBerries = () => {
		fetch('/api/pokemons/berries')
			.then(res => res.json())
			.then(berries => this.setState({ berries: berries.results }));
	};

	render() {
		const { berries } = this.state;
		return (<section>
			<h4>Available berries</h4>
			<ul>
				{berries && berries.map(berry => <div key={berry.url} title={berry.url}>{berry.name}</div>) }
			</ul>
		</section>);
	}
}