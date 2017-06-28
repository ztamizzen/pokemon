import React from 'react';

export const Passwords = ({ passwords }) => {
	const mapped = passwords.map((password, key) => <li key={key}>{password}</li>);
	return (
		<ul className="passwords">
			{mapped}
		</ul>
	);
};
