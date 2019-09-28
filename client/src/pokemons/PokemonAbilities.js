import React from 'react';
import PropTypes from 'prop-types';

export const PokemonAbilities = ({ abilities }) => (
	<div>{abilities.map((ability, idx) => <span key={idx}
												className="meta__child">{ability.ability.name}</span>)}</div>
);

PokemonAbilities.propTypes = {
	abilities: PropTypes.arrayOf(PropTypes.object).isRequired
};
