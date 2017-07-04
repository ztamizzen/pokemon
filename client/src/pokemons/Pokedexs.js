import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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
			<h3 className="pokedexs__title">Available pokedexs</h3>
			<CSSTransitionGroup component="ul"
								className="pokenav"
								transitionAppear={true}
								transitionAppearTimeout={500}
								transitionName="pokemon-inner-animation"
								transitionEnterTimeout={500}
								transitionLeaveTimeout={300}>
				{pokedexs && pokedexs.map(dex => <li key={dex.url} title={dex.url}
													 className="pokedexs__item"
													 onClick={() => this.getPokedex(dex.name)}>
					<h4 className="pokedexs__name">{ dex.name }</h4>
					<CSSTransitionGroup component="div"
										transitionAppear={true}
										transitionAppearTimeout={500}
										transitionName="pokemon-inner-animation"
										transitionEnterTimeout={500}
										transitionLeaveTimeout={300}>
						{ pokedex && pokedex.name === dex.name && (
							<div className="pokedexs__description">{this.getDescription("en").description}</div>)}
					</CSSTransitionGroup>
				</li>) }
			</CSSTransitionGroup>
		</section>);
	}
}