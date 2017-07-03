import React, { Component } from 'react';
import './Pokedexs.css';

export class Pokedexs extends Component {
	state = { pokedexs: [], pokedex: null };

	componentDidMount() {
		this.getPokedexs();
	}

	getPokedexs = () => {
		fetch('/api/pokemons/pokedex')
			.then(res => res.json())
			.then(pokedexs => this.setState({ pokedexs: pokedexs.results }));
	};

	getPokedex = (idx) => {
		fetch('/api/pokemons/pokedex/' + idx)
			.then(res => res.json())
			.then(pokedex => this.setState({ pokedex }));
	};

	getDescription(lang) {
		return this.state.pokedex.descriptions.find(description => description.language.name === lang);
	}

	render() {
		const { pokedexs, pokedex } = this.state;
		return (<section className="pokedexs">
			<h4 className="pokedexs__title">Available pokedexs</h4>
			<ul>
				{pokedexs && pokedexs.map(dex => <li key={dex.url} title={dex.url}
													 className="pokedexs__item" onClick={() => this.getPokedex(dex.name)}>
					<h5 className="pokedexs__name">{ dex.name }</h5>
					{ pokedex && pokedex.name === dex.name && (
						<div className="pokedexs__description">{this.getDescription("en").description}</div>)}
				</li>) }
			</ul>
		</section>);
	}
}