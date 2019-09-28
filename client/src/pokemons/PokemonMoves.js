import React from 'react';
import PropTypes from 'prop-types';
import './PokeMoves.css';

export const PokemonMoves = ({ moves }) => {
	const movesMap = moves.map((move, idx) => {
		/*const groupDetails = move.version_group_details.map((vers, idx) => {
		 return <li key={idx} className="pokemoves__sublist--item">Learned at {vers.level_learned_at}
		 by {vers.move_learn_method.name} of
		 group {vers.version_group.name}</li>;
		 });*/
		const groupDetails = move.version_group_details.map((vers, idx) => {
			return <tr key={idx}>
				<td>{vers.level_learned_at}</td>
				<td>{vers.move_learn_method.name}</td>
				<td>group {vers.version_group.name}</td>
			</tr>;
		});
		return (<li key={idx}>
			<h4 className="pokemoves__subheader">{move.move.name}</h4>
			<table className="pokemoves__table">
				<colgroup>
					<col width="20%" />
					<col width="30%" />
					<col width="50%" />
				</colgroup>
				<thead>
				<tr>
					<th>Level</th>
					<th>Method</th>
					<th>Group</th>
				</tr>
				</thead>
				{/*<ul className="pokemoves__sublist">{groupDetails}</ul>*/}
				<tbody>
				{groupDetails}
				</tbody>
			</table>
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
