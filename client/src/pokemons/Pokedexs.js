import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Loader } from '../Loader';
import './Pokedexs.css';

export class Pokedexs extends Component {
	state = { pokedexs: [], pokedex: null, loading: false };

	componentDidMount() {
		this.getPokedexs();
	}

	getPokedexs = () => {
		fetch('/api/pokemons/pokedex')
			.then(res => res.json())
			.then(pokedexs => this.setState({ pokedexs: pokedexs.results }));
	};

	getPokedex = (idx) => {
		this.setState({ loading: true });
		fetch('/api/pokemons/pokedex/' + idx)
			.then(res => res.json())
			.then(pokedex => this.setState({ pokedex, loading: false }));
	};

	getDescription(lang) {
		return this.state.pokedex.descriptions.find(description => description.language.name === lang);
	}

	render() {
		const { pokedexs, pokedex, loading } = this.state;
		return (<section className="pokedexs">
			{ loading && <Loader />}
			<h3 className="pokedexs__title">Available pokedexs</h3>
			<CSSTransition component="ul"
								className="pokedexs__list"
								transitionAppear={true}
								transitionAppearTimeout={500}
								transitionName="pokemon-inner-animation"
								transitionEnterTimeout={500}
								transitionLeaveTimeout={300}>
				{pokedexs && pokedexs.map(dex => <li key={dex.url} title={dex.url}
													 className="pokedexs__item"
													 onClick={() => this.getPokedex(dex.name)}>
					<h4 className="pokedexs__name">{ dex.name }</h4>
					<CSSTransition component="ul"
										transitionAppear={true}
										transitionAppearTimeout={500}
										transitionName="pokemon-inner-animation"
										transitionEnterTimeout={500}
										transitionLeaveTimeout={300}>
						{ pokedex && pokedex.name === dex.name && (
							<li className="pokedexs__description">{this.getDescription("en").description}</li>)}
					</CSSTransition>
				</li>) }
			</CSSTransition>
		</section>);
	}
}