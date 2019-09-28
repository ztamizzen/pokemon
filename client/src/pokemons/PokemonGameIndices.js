import React from 'react';
import PropTypes from 'prop-types';

export const PokemonGameIndices = ({ indices }) => (
	<div>{indices.map((indice, idx) => (
		<span key={idx}
			  className="meta__child">{indice.version.name}</span>
	))}</div>);

PokemonGameIndices.propTypes = {
	indices: PropTypes.arrayOf(PropTypes.object).isRequired
};
