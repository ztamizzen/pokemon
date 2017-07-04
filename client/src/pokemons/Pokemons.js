import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import {
	NavLink,
	Route,
	Switch
} from 'react-router-dom';
import { Berries } from './Berries';
import { Pokedexs } from './Pokedexs';
import { PokemonList } from './PokemonList';
import './Pokemons.css';

export class Pokemons extends Component {
	state = {
		count: 0,
		pokemons: null,
		limit: 5,
		offset: -1
	};

	componentDidMount() {
		this.getPokemonsList();
	}

	getPokemonsList = () => {
		fetch(`/api/pokemons?limit=${this.state.limit}&offset=${this.state.offset}`)
			.then(res => res.json())
			.then(pokemons => this.setState({ count: pokemons.count, pokemons: pokemons.results }));
	};

	updateLimit = (e) => {
		this.setState({ limit: parseInt(e.target.value, 10) }, () => {
			this.getPokemonsList();
		});
	};

	updateOffset = (e) => {
		let value;
		if (typeof e === "number") {
			value = parseInt(e, 10);
		}
		else {
			value = parseInt(e.target.value, 10);
		}
		this.setState({ offset: (this.state.offset + value) || -1 }, () => {
			this.getPokemonsList();
		});
	};

	goNext = (e) => {
		e.preventDefault();
		this.updateOffset(this.state.limit);
	};

	goPrev = (e) => {
		e.preventDefault();
		this.updateOffset(-this.state.limit);
	};

	render() {
		if (this.state.pokemons) {
			const { match } = this.props;
			const { count, pokemons, offset, limit } = this.state,
				pokemonList = pokemons.map((poke, idx) => <Pokemon key={idx} pokemon={poke} match={match} />);
			return (
				<div className="pokemons" ref={pokemon => this.pokemon = pokemon}>
					<h2>Pokemons and stuff</h2>
					<ul className="pokenav">
						<li>
							<ul>
								<li>
									<NavLink to={`${match.url}/berries`}>Berries</NavLink>
									<NavLink to={`${match.url}/pokedexs`}>Pokedexs</NavLink>
								</li>
							</ul>
						</li>
						<li className="pokesearch-form">
							<form>
								<div className="pokesearch-row">
									<label htmlFor="select-limit">Amount:</label>
									<select id="select-limit" value={this.state.limit} onChange={this.updateLimit}>
										<option value="5">5</option>
										<option value="10">10</option>
										<option value="15">15</option>
									</select>
								</div>
								<div className="pokesearch-row">
									<span>Offset:</span>
									<span>
										{offset + 1} / {Math.ceil(count / limit) } pages
									</span>
								</div>
								<div className="btn-group">
									<button className="btn" onClick={this.goPrev}
											disabled={offset <= 0}>&laquo;</button>
									<button className="btn" onClick={this.goNext}>&raquo;</button>
								</div>
							</form>
						</li>
						<li className="pokenav__list">
							<h3 className="pokenav__header">Pokemons ({count} available)</h3>
							<CSSTransitionGroup component="ul"
												className="pokenav"
												transitionAppear={true}
												transitionAppearTimeout={500}
												transitionName="pokemon-animation"
												transitionEnterTimeout={500}
												transitionLeaveTimeout={300}>
								{pokemonList}
							</CSSTransitionGroup>
						</li>
					</ul>

					<CSSTransitionGroup component="div"
										transitionAppear={true}
										transitionAppearTimeout={500}
										transitionName="pokemon-animation"
										transitionEnterTimeout={500}
										transitionLeaveTimeout={300}>
						<Switch>
							<Route path={`${match.url}/berries`} component={Berries} />
							<Route path={`${match.url}/pokedexs`} component={Pokedexs} />
							<Route path={`${match.url}/pokemon-list`} render={() => (
								<PokemonList limit={limit} offset={offset} count={count} />
							)} />
							<Route path={`${match.url}/:pokemon`} component={PokemonInfo} />
							<Route exact path={match.url} render={() => (
								<div>
									<h2>&laquo; Select a Pokemon &raquo;</h2>
								</div>
							)} />
						</Switch>
					</CSSTransitionGroup>
				</div>
			);
		}
		return null;
	}
}

export class PokemonInfo extends Component {
	state = { pokemon: null };

	componentDidMount() {
		this.getPokemon();
	}

	componentDidUpdate(nextProps, nextState) {
		if (nextProps.match.params.pokemon !== this.props.match.params.pokemon) {
			this.getPokemon();
		}
	}

	getPokemon = () => {
		fetch(`/api/pokemon/${this.props.match.params.pokemon}`)
			.then(res => res.json())
			.then(pokemon => this.setState({ pokemon }));
	};

	clearPokemon = (e) => {
		e.preventDefault();
		this.setState({ pokemon: null });
	};

	render() {
		let { pokemon } = this.state;
		if (!pokemon) {
			return null;
		}

		return (
			<div className="pokemon">
				<a href="" onClick={this.clearPokemon} className="pokemon__close">&times;</a>
				<h3>{pokemon.name} ({pokemon.base_experience}XP)</h3>
				<div className="pokemon__sprites">
					<PokemonSprites sprites={pokemon.sprites} name={pokemon.name} />
				</div>
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

export const PokemonSprites = ({ sprites, name }) => {
	let _sprites = [], i = 0;
	for (let key in sprites) {
		if (sprites.hasOwnProperty(key)) {
			if (sprites[key]) {
				i++;
				_sprites.push(sprites[key]);
			}
		}
		if (i === 4) break;
	}
	return (<div className="cube">
		{_sprites.map((sprite, idx) => <figure className="cube-face" key={idx}><img src={sprite} alt={name} />
		</figure>)}
	</div>);
};

PokemonSprites.propTypes = {
	sprites: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired
};

export const PokemonMoves = ({ moves }) => {
	const movesMap = moves.map((move, idx) => {
		const groupDetails = move.version_group_details.map((vers, idx) => {
			return <li key={idx} className="pokemoves__sublist--item">Learned at {vers.level_learned_at} by {vers.move_learn_method.name} of
				group {vers.version_group.name}</li>;
		});
		return (<li key={idx}>
			<h4 className="pokemoves__subheader">{move.move.name}</h4>
			<ul className="pokemoves__sublist">{groupDetails}</ul>
		</li>);
	});
	return <details className="pokemoves__details">
		<summary className="pokemoves__summary">Moves (long list)</summary>
		<ul className="pokemoves__list">{movesMap}</ul>
	</details>
};

PokemonMoves.propTypes = {
	moves: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const PokemonForms = ({ forms }) => (
	<div>{forms.map((form, idx) => <span key={idx} className="meta__child">{form.name}</span>)}</div>);

PokemonForms.propTypes = {
	forms: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const PokemonAbilities = ({ abilities }) => (
	<div>{abilities.map((ability, idx) => <span key={idx}
												className="meta__child">{ability.ability.name}</span>)}</div>
);

PokemonAbilities.propTypes = {
	abilities: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const PokemonGameIndices = ({ indices }) => (
	<div>{indices.map((indice, idx) => (
		<span key={idx}
			  className="meta__child">{indice.version.name}</span>
	))}</div>
);

PokemonGameIndices.propTypes = {
	indices: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const PokemonStats = ({ stats }) => (
	<div>{stats.map((stat, idx) => (<span className="meta__child stat" key={idx}>
			{stat.stat.name}: <sub>effort</sub>{stat.effort}/<sub>base stat</sub>{stat.base_stat}
		</span>)
	)}</div>
);

PokemonStats.propTypes = {
	stats: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const Pokemon = ({ pokemon, match }) => {
	return (<li>
		<NavLink className="pokemon-name" to={`${match.url}/${pokemon.name}`}>{pokemon.name}</NavLink>
	</li>);
};

Pokemon.propTypes = {
	pokemon: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};
