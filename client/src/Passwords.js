import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './Passwords.css';

export class Passwords extends Component {
	state = { passwords: [] };

	componentDidMount() {
		this.getPasswords();
	}

	getPasswords = () => {
		fetch('/api/passwords')
			.then(res => res.json())
			.then(passwords => this.setState({ passwords }));
	};

	render() {
		const { passwords } = this.state;
		const mapped = passwords.map((password, key) => <li key={key}>{password}</li>);

		return (
			<div className="passwords-wrapper">
				<CSSTransitionGroup
					component="ul"
					className="passwords"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionName="password-animation"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
					{mapped}
				</CSSTransitionGroup>
				<button className="more" onClick={this.getPasswords}>Nope, others&hellip;</button>
			</div>
		);
	}
}
