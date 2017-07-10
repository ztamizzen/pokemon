import React from 'react';
import PropTypes from 'prop-types';

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
