import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PokemonSprites.css';

export class PokemonSprites extends Component {
	state = { line: false };

	toggleLayout = () => {
		this.setState({ line: !this.state.line });
	};

	render() {
		const { sprites, name } = this.props;
		const { line } = this.state;

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
		return (<div className={ line ? "pokemon__sprites--line" : "pokemon__sprites"}>
			<div className="cube" onClick={this.toggleLayout} title="Click to show all on one line">
				{_sprites.map((sprite, idx) => <figure className="cube-face" key={idx}><img src={sprite} alt={name} />
				</figure>)}
			</div>
		</div>);
	}
}

PokemonSprites.propTypes = {
	sprites: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired
};
