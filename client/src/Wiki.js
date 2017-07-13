import React, { Component } from 'react';
import { Loader } from './Loader';
import './Wiki.css';

export class Wiki extends Component {
	state = { article: null, loripsum: null };

	componentDidMount() {
		this.getRandomWiki();
		this.getLoripsum();
	}

	loripsumHash = {
		paragraphCount: 10,
		paragraphLength: "short",
		decorate: false,
		link: true,
		ul: false,
		ol: false,
		dl: false,
		bq: false,
		code: false,
		headers: true,
		allcaps: false,
		prude: false
	};

	getLoripsumUrl = () => {
		let arr = [],
			keys = Object.keys(this.loripsumHash);
		for (let i = 0, len = keys.length; i < len; ++i) {
			let key = keys[i], value = this.loripsumHash[key];
			arr.push([key, value].join('='));
		}
		return arr.join('&');
	};

	getLoripsum = () => {
		let url = this.getLoripsumUrl();
		fetch('/api/loripsum?' + url)
			.then(res => res.text())
			.then(loripsum => this.setState({ loripsum }))
	};

	getRandomWiki = () => {
		fetch('/api/wiki/random')
			.then(res => res.json())
			.then(json => {
				return this.setState({ article: json.raw })
			});
	};

	render() {
		const { article, loripsum } = this.state;
		if (article) {
			return (<div className="loripsum">
				<div dangerouslySetInnerHTML={{ __html: loripsum }}></div>
				<span>Random wikipedia article <a
					href={article.fullurl}>{article.title}</a>
				</span>
			</div>);
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
			return wikipage && <div className="wikiarticle" dangerouslySetInnerHTML={{ __html: wikipage }}></div>;
		}
		return <Loader />;
	}
}
