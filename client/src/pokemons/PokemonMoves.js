import React from 'react';
import PropTypes from 'prop-types';

export const PokemonMoves = ({ moves }) => {
	const movesMap = moves.map((move, idx) => {
		const groupDetails = move.version_group_details.map((vers, idx) => {
			return <li key={idx} className="pokemoves__sublist--item">Learned at {vers.level_learned_at}
				by {vers.move_learn_method.name} of
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
