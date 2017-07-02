import React, { Component } from 'react';
import './Gallery.css';

export class Gallery extends Component {
	state = { count: 9, images: [] };

	componentDidMount() {
		const count = this.state.count;
		for (let i = 0; i < count; ++i) {
			let requestObj = '/gallery/pic' + i + '.jpg';
			this.loadImage(requestObj);
		}
	}

	loadImage(requestObj) {
		fetch(requestObj)
			.then(response => response.blob())
			.then(blob => {
				let state = this.state.images;
				state.push(blob);
				return this.setState({ images: state });
			});
	}

	render() {
		const { images } = this.state;
		return (<div className="gallery">
			{images && images.map((image, idx) => <Image key={idx} imageBlob={image} />)}
		</div>);
	}
}

export const Image = ({ imageBlob }) => {
	let url = URL.createObjectURL(imageBlob);
	return (<img src={url} alt="" />);
};