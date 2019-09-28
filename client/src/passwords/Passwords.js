import React, {
	useEffect,
	useState
} from 'react';
import {
	CSSTransition,
	TransitionGroup
} from 'react-transition-group';

import './Passwords.css';

export function Passwords() {
	const [passwords, setPasswords] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/api/passwords');
			const json = await response.json();
			setPasswords(json);
		}
		fetchData();
		return () => [];
	}, []);

	return (
		<div className="passwords-wrapper">
			<h2>Generated from node module</h2>
			<h3>Loaded through useEffect hook</h3>
			<TransitionGroup
				className="passwords"
				component="ul">
				{passwords.map((pwd, index) => (
					<CSSTransition
						key={index}
						timeout={200}
						className="password">
						<li>{pwd}</li>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	);
}
