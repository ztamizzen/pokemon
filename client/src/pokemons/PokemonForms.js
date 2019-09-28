import React from 'react';
import PropTypes from 'prop-types';

export const PokemonForms = ({ forms }) => (
	<div>{forms.map((form, idx) => <span key={idx} className="meta__child">{form.name}</span>)}</div>);

PokemonForms.propTypes = {
	forms: PropTypes.arrayOf(PropTypes.object).isRequired
};
