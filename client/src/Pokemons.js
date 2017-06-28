import React, { Component } from 'react';
import './Pokemons.css';

export class Pokemons extends Component {
	state = { pokemons: null, pokemon: null };
	offset = 0;

	componentDidMount() {
		this.getPokemonsList();
	}

	getPokemonsList = () => {
		fetch(`/api/pokemons?offset=${this.offset}`)
			.then(res => res.json())
			.then(pokemons => this.setState({ pokemons: pokemons.results }));
	};

	getPokemon = (e) => {
		fetch(`/api/pokemons?name=${e.currentTarget.textContent}`)
			.then(res => res.json())
			.then(pokemon => this.setState({ pokemon }));
	};


	render() {
		if (this.state.pokemons) {
			const { pokemons, pokemon } = this.state,
				pokemonList = pokemons.map((poke, idx) => <Pokemon key={idx} pokemon={poke}
																   onClick={this.getPokemon} fullinfo={pokemon} />);
			return (<div className="pokemons">
				<h2>Pokemons (click to learn more)</h2>
				<ul>
					{pokemonList}
				</ul>
				{/*<button className="more" onClick={this.getPokemonsList}>More</button>*/}
			</div>);
		}
		return null;
	}
}

export const Pokemon = ({ pokemon, onClick, fullinfo }) => {
	if (fullinfo && fullinfo.name === pokemon.name) {
		let sprites = [];
		for (let key in fullinfo.sprites) {
			if (fullinfo.sprites.hasOwnProperty(key)) {
				if (fullinfo.sprites[key]) {
					sprites.push(fullinfo.sprites[key]);
				}
			}
		}
		sprites = sprites.map((sprite, idx) => <img src={sprite} alt={fullinfo.name} key={idx} />);
		console.log(fullinfo, sprites);
		return (<li className="pokemon">
			<h3>{fullinfo.name} {fullinfo.base_experience}XP</h3>
			{sprites}
			<dl className="meta">
				<dt>Species</dt>
				<dd>{fullinfo.species.name}</dd>
				<dt>Height</dt>
				<dd>{fullinfo.height}</dd>
				<dt>Weight</dt>
				<dd>{fullinfo.weight}</dd>
			</dl>
		</li>);
	}
	return (<li onClick={onClick}>{pokemon.name}</li>);
};