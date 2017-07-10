import React, { Component } from 'react';
import { Loader } from './Loader';
import './Wiki.css';

export class Wiki extends Component {
	state = { article: null };

	componentDidMount() {
		this.getRandomWiki();
	}

	getRandomWiki = () => {
		fetch('/api/wiki/random')
			.then(res => res.json())
			.then(json => {
				console.log(json);
				return this.setState({ article: json.raw })
			});
	};

	render() {
		const { article } = this.state,
			page = article && <WikiPage wikiTitle={article.title} />;
		if (article) {
			return (<span>Random wikipedia article <a
				href={article.fullurl}>{article.title}</a> {page}</span>);
		}
		return <Loader />;
	}
}

export class WikiPage extends Component {
	state = { wikipage: null };

	componentDidMount() {
		this.getWikiPage();
	}

	getWikiPage = () => {
		fetch('/api/wiki/' + encodeURIComponent(this.props.wikiTitle))
			.then(res => res.json())
			.then(wikipage => this.setState({ wikipage }));
	};

	render() {
		let { wikipage } = this.state;
		if (wikipage) {
			let subHeaders = /===\s(.+)\s===/ig,
				headers = /==\s(.+)\s==/ig,
				lineBreaks = /(\n)/ig;
			wikipage = wikipage.replace(subHeaders, (match, hits) => {
				return `<h3>${hits}</h3>`;
			});
			wikipage = wikipage.replace(headers, (match, hits) => {
				return `<h2>${hits}</h2>`;
			});
			wikipage = wikipage.replace(lineBreaks, () => {
				return '<br />';
			});
			console.log(wikipage);
			return wikipage && <div className="wikiarticle" dangerouslySetInnerHTML={{ __html: wikipage }}></div>;
		}
		return <Loader />;
	}
}
