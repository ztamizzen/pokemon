import React, { Component } from 'react';
import { PokemonSprites } from './PokemonSprites';
import { PokemonMoves } from './PokemonMoves';
import { PokemonGameIndices } from "./PokemonGameIndices";
import { PokemonAbilities } from "./PokemonAbilities";
import { PokemonForms } from "./PokemonForms";
import { PokemonStats } from "./PokemonStats";

export class PokemonInfo extends Component {
	state = { pokemon: null, loading: false };

	componentDidMount() {
		this.getPokemon();
	}

	componentDidUpdate(nextProps) {
		if (nextProps.match.params.pokemon !== this.props.match.params.pokemon) {
			this.getPokemon();
		}
	}

	getPokemon = () => {
		this.setState({ loading: true });
		fetch(`/api/pokemon/${this.props.match.params.pokemon}`)
			.then(res => res.json())
			.then(pokemon => this.setState({ pokemon, loading: false }));
	};

	clearPokemon = (e) => {
		e.preventDefault();
		this.setState({ pokemon: null });
	};

	render() {
		let { pokemon, loading } = this.state;
		if (!pokemon) {
			return null;
		}

		return (
			<div className={"pokemon" + (loading ? ' loading' : '')}>
				<button onClick={this.clearPokemon} className="pokemon__close">&times;</button>
				<h3 className="pokedexs__title">{pokemon.name} ({pokemon.base_experience}XP)</h3>
				<PokemonSprites sprites={pokemon.sprites} name={pokemon.name} />
				<dl className="meta">
					<dt>Species:</dt>
					<dd>
						<span className="meta__child">{pokemon.species.name}</span>
					</dd>
					<dt>Forms:</dt>
					<dd>
						<PokemonForms forms={pokemon.forms} />
					</dd>
					<dt>Height:</dt>
					<dd>{pokemon.height}</dd>
					<dt>Weight:</dt>
					<dd>{pokemon.weight}</dd>
					<dt>Abilities:</dt>
					<dd>
						<PokemonAbilities abilities={pokemon.abilities} />
					</dd>
					<dt>Game indices:</dt>
					<dd>
						<PokemonGameIndices indices={pokemon.game_indices} />
					</dd>
					<dt>Stats:</dt>
					<dd className="stats">
						<PokemonStats stats={pokemon.stats} />
					</dd>
					<dt className="pokemoves__title"></dt>
					<dd className="pokemoves">
						<PokemonMoves moves={pokemon.moves} />
					</dd>
				</dl>
			</div>
		);
	}
}

