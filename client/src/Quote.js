import React, { Component } from 'react';

class Quote extends Component {
	render() {
		const { quote } = this.props;
		return (
			<blockquote className="quote" cite={quote.link}>
				<div dangerouslySetInnerHTML={{ __html: quote.content }}></div>
				<a href={quote.link} target="_blank" rel="noopener noreferrer">{quote.title}</a>
			</blockquote>
		);
	}
}

export default Quote;