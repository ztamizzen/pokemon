import React from 'react';
import PropTypes from 'prop-types';

export const PokemonStats = ({ stats }) => (
	<div>{stats.map((stat, idx) => (<span className="meta__child stat" key={idx}>
			{stat.stat.name}: <sub>effort</sub>{stat.effort}/<sub>base stat</sub>{stat.base_stat}
		</span>)
	)}</div>);

PokemonStats.propTypes = {
	stats: PropTypes.arrayOf(PropTypes.object).isRequired
};
