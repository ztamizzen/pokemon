import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import {
	Route,
	NavLink
} from 'react-router-dom';
import './Pokemons.css';

export class Pokemons extends Component {
	state = {
		pokemons: null,
		limit: 10,
		offset: 0
	};

	componentDidMount() {
		this.getPokemonsList();
	}

	getPokemonsList = () => {
		fetch(`/api/pokemons?limit=${this.state.limit}&offset=${this.state.offset}`)
			.then(res => res.json())
			.then(pokemons => this.setState({ pokemons: pokemons.results }));
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
		this.setState({ offset: (this.state.offset + value) || 0 }, () => {
			this.getPokemonsList();
		});
	};

	goNext = (e) => {
		e.preventDefault();
		this.updateOffset(10);
	};

	goPrev = (e) => {
		e.preventDefault();
		this.updateOffset(-10);
	};

	render() {
		if (this.state.pokemons) {
			const { match } = this.props;
			const { pokemons, offset } = this.state,
				pokemonList = pokemons.map((poke, idx) => <Pokemon key={idx} pokemon={poke} match={match} />);
			return (
				<div className="pokemons" ref={pokemon => this.pokemon = pokemon}>
					<h2>Pokemons</h2>
					<CSSTransitionGroup component="ul"
										className="pokenav"
										transitionAppear={true}
										transitionAppearTimeout={500}
										transitionName="pokemon-animation"
										transitionEnterTimeout={500}
										transitionLeaveTimeout={300}>
						<li>
							<form>
								<label htmlFor="select-limit">Amount:</label>
								<select id="select-limit" value={this.state.limit} onChange={this.updateLimit}>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
								</select>
								<div>Offset: {offset}</div>
								<div className="btn-group">
									<button className="btn" onClick={this.goPrev}
											disabled={offset <= 0}>&laquo;</button>
									<button className="btn" onClick={this.goNext}>&raquo;</button>
								</div>
							</form>
						</li>
						{pokemonList}
					</CSSTransitionGroup>

					<CSSTransitionGroup component="div"
										transitionAppear={true}
										transitionAppearTimeout={500}
										transitionName="pokemon-animation"
										transitionEnterTimeout={500}
										transitionLeaveTimeout={300}>
						<Route path={`${match.url}/:pokemon`} component={PokemonInfo} />
						<Route exact path={match.url} render={() => (
							<div>
								<h2>&laquo; Select a Pokemon &raquo;</h2>
							</div>
						)} />
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
		fetch(`/api/pokemon?name=${this.props.match.params.pokemon}`)
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
					<dt className="pokemoves__title">Moves:</dt>
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

export const PokemonMoves = ({ moves }) => {
	const movesMap = moves.map((move, idx) => {
		const groupDetails = move.version_group_details.map((vers, idx) => {
			return <li key={idx}>Learned at {vers.level_learned_at} by {vers.move_learn_method.name} of
				group {vers.version_group.name}</li>;
		});
		return (<li key={idx}>
			<h4>{move.move.name}</h4>
			<ul>{groupDetails}</ul>
		</li>);
	});
	return <ul>{movesMap}</ul>;
};

export const PokemonForms = ({ forms }) => {
	return (<div>{forms.map((form, idx) => <span key={idx} className="meta__child">{form.name}</span>)}</div>)
};

export const PokemonAbilities = ({ abilities }) => (
	<div>{abilities.map((ability, idx) => <span key={idx}
												className="meta__child">{ability.ability.name}</span>)}</div>
);

export const PokemonGameIndices = ({ indices }) => (
	<div>{indices.map((indice, idx) => (
		<span key={idx}
			  className="meta__child">{indice.version.name}</span>
	))}</div>
);

export const PokemonStats = ({ stats }) => (
	<div>{stats.map((stat, idx) => (<span className="meta__child stat" key={idx}>
			{stat.stat.name}: <sub>effort</sub>{stat.effort}/<sub>base stat</sub>{stat.base_stat}
		</span>)
	)}</div>
);

export const Pokemon = ({ pokemon, match }) => {
	return (<li>
		<NavLink className="pokemon-name" to={`${match.url}/${pokemon.name}`}>{pokemon.name}</NavLink>
	</li>);
};

