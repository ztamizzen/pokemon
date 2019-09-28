import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	CSSTransition,
	TransitionGroup
} from 'react-transition-group';
import {
	NavLink,
	Route,
	Switch
} from 'react-router-dom';
import { Berries } from './Berries';
import { Pokedexs } from './Pokedexs';
import { PokemonList } from './PokemonList';
import { PokemonInfo } from './PokemonInfo';
import { Wiki } from '../Wiki';
import { Loader } from '../Loader';
import './Pokemons.css';

export class Pokemons extends Component {
	state = {
		count: 0,
		pokemons: null,
		limit: 5,
		loading: false,
		offset: 0
	};

	componentDidMount() {
		this.getPokemonsList();
	}

	getPokemonsList = () => {
		this.setState({ loading: true });
		fetch(`/api/pokemons?limit=${this.state.limit}&offset=${this.state.offset}`)
			.then(res => res.json())
			.then(pokemons => this.setState({
				count: pokemons.count,
				pokemons: pokemons.results,
				loading: false
			}));
	};

	updateLimit = (e) => {
		this.setState({
			limit: parseInt(e.target.value, 10)
		}, () => {
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
		this.updateOffset(this.state.limit);
	};

	goPrev = (e) => {
		e.preventDefault();
		this.updateOffset(-this.state.limit);
	};

	render() {
		if (this.state.pokemons) {
			const { match } = this.props;
			const { count, pokemons, offset, limit, loading } = this.state,
				pokemonList = pokemons.map((poke, idx) => (
					<CSSTransition
						key={idx}
						timeout={200}
						className="password">
						<Pokemon key={idx} pokemon={poke} match={match} />
					</CSSTransition>
				));
			return (
				<div className="pokemons" ref={pokemon => this.pokemon = pokemon}>
					<h2>Pokemons and stuff</h2>
					<ul className="pokemons__pokenav">
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
							<TransitionGroup
								component="ul"
								className="pokenav">
								{pokemonList}
							</TransitionGroup>
						</li>
					</ul>
					{ loading && <Loader />}

					<TransitionGroup
						component="div">
						<Switch>
							<Route path={`${match.url}/berries`} component={Berries} />
							<Route path={`${match.url}/pokedexs`} component={Pokedexs} />
							<Route path={`${match.url}/pokemon-list`} render={() => (
								<PokemonList limit={limit} offset={offset} count={count} />
							)} />
							<Route path={`${match.url}/:pokemon`} component={PokemonInfo} />
							<Route exact path={match.url} render={() => (
								<Wiki />
							)} />
						</Switch>
					</TransitionGroup>
				</div>
			);
		}
		return <Loader />;
	}
}

export const Pokemon = ({ pokemon, match }) => {
	return (<li>
		<NavLink to={`${match.url}/${pokemon.name}`}>{pokemon.name}</NavLink>
	</li>);
};

Pokemon.propTypes = {
	pokemon: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};
