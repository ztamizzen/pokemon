import React from 'react';


export const Quotes = ({ quotes }) => {
	const quoteArray = quotes.map((quote, idx) => <Quote quote={quote} key={idx} />);
	return (<div className="quotes">
		{quoteArray}
	</div>);
};

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
