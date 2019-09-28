import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import './Berries.css';

class BerriesClass extends Component {
	state = { berries: [] };

	componentDidMount() {
		this.getBerries();
		this.props.dispatch({ type: 'SHOW_ALL_BERRIES' });
	}

	getBerries = () => {
		fetch('/api/pokemons/berries')
			.then(res => res.json())
			.then(berries => this.setState({ berries: berries.results }));
	};

	render() {
		const { berries } = this.state;
		const berryOutput = berries && berries.map(berry => <Berry key={berry.url} berry={berry} />);
		return (<section className="pokedexs">
			<h3 className="pokedexs__title">Available berries</h3>
			<CSSTransition component="ul"
								className="berries__list"
								transitionAppear={true}
								transitionAppearTimeout={500}
								transitionName="pokemon-inner-animation"
								transitionEnterTimeout={500}
								transitionLeaveTimeout={300}>
				{berryOutput}
			</CSSTransition>
		</section>);
	}
}

export const Berries = connect()(BerriesClass);

export class BerryClass extends Component {
	state = { berryData: null };
	loadBerryData = (e) => {
		if (!this.state.berryData) {
			const name = e.currentTarget.textContent;
			fetch(`/api/pokemons/berries/${name}`)
				.then(res => res.json())
				.then(berry => this.setState({ berryData: berry }));
		} else {
			this.setState({ berryData: null });
		}
	};

	render() {
		const { berry } = this.props,
			{ berryData } = this.state;
		return (
			<CSSTransition component="li"
								className={"pokedex__transition" + (berryData ? " active" : "")}
								transitionAppear={true}
								transitionAppearTimeout={500}
								transitionName="pokemon-inner-animation"
								transitionEnterTimeout={500}
								transitionLeaveTimeout={300}>
				<h4 className="pokedexs__name" onClick={this.loadBerryData}>{berry.name}</h4>
				{ berryData && (
					<ul>
						<li>Growth time: {berryData.growth_time}</li>
						<li>Max harvest: {berryData.max_harvest}</li>
						<li>Natural gift power: {berryData.natural_gift_power.name}</li>
						<li>Natural gift type: {berryData.natural_gift_type.name}</li>
						<li>Size: {berryData.size}mm</li>
						<li>Smoothness: {berryData.smoothness}</li>
						<li>Soil dryness: {berryData.soil_dryness}</li>
						<li>Firmness: {berryData.firmness.name}</li>
						<li>Flavors: <Flavors flavors={berryData.flavors} /></li>
						<li>Item: {berryData.item.name}</li>
					</ul>
				)}
			</CSSTransition>
		);
	}
}

export const Berry = connect()(BerryClass);

const FlavorsClass = ({ flavors }) => {
	const output = flavors && flavors.map((flavor, idx) => (
			<li key={idx}>{flavor.flavor.name}, potency: {flavor.potency};</li>)
		);
	return <ul className="pokedexs__item--list">{output}</ul>;
};

export const Flavors = connect()(FlavorsClass);