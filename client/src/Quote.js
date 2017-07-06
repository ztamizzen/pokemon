import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

export class Quotes extends Component {
	state = { quotes: null };

	componentDidMount() {
		// this.interval = setInterval(() => this.getQuote(), 5000);
		this.getQuote();
	}

	componentWillUnmount() {
		// clearInterval(this.interval);
	}

	getQuote = () => {
		fetch('/api/quote')
			.then(res => res.json())
			.then(quotes => this.setState({ quotes }));
	};

	render() {
		const { quotes } = this.state,
			quoteArray = quotes && quotes.map((quote, idx) => <Quote quote={quote} key={idx} />);
		return (
			<div className="quotes">
				<CSSTransitionGroup transitionAppear={true}
									transitionAppearTimeout={500}
									transitionName="pokemon-animation"
									transitionEnterTimeout={500}
									transitionLeaveTimeout={300}>
					{quoteArray}
				</CSSTransitionGroup>
				{ quotes && <button className="other-quote" onClick={this.getQuote}>Another</button>}
			</div>
		);
	}
}

export const Quote = ({ quote }) => {
	return (
		<blockquote className="quote" cite={quote.link}>
			<div>
				<div dangerouslySetInnerHTML={{ __html: quote.content }}></div>
				<a href={quote.link} target="_blank" rel="noopener noreferrer">{quote.title}</a>
				{ quote.custom_meta && " from " }
				{ quote.custom_meta && (
					<span dangerouslySetInnerHTML={{ __html: quote.custom_meta.Source }}></span>)}
			</div>
		</blockquote>
	);
};
