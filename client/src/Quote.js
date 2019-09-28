import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
/* 
function Wiki() {
	const [inProp, setInProp] = useState(false);
}
*/
export class Wiki extends Component {
	state = { article: null };

	componentDidMount() {
		this.getRandomWiki();
	}

	getRandomWiki = () => {
		fetch('/api/wiki/random')
			.then(res => res.json())
			.then(json => this.setState({ article: json.raw }));
	};

	render() {
		return this.state.article && (<span>Random wikipedia article <a
				href={this.state.article.fullurl}>{this.state.article.title}</a></span>);
	}
}

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
		const { quotes } = this.state;
		const quoteArray = quotes && quotes.map((quote, idx) => <Quote quote={quote} key={idx} />);
		const inProp = quotes && quotes.length > 0;
		return (
			<CSSTransition in={inProp}
							   timeout={200}
							   className="pokemon-animation">
				<div className="quotes">
					{quoteArray}
					{ quotes && <button className="other-quote" onClick={this.getQuote}>Another</button>}
				</div>
			</CSSTransition>
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
