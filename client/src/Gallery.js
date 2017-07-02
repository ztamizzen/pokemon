import React, { Component } from 'react';
import './Gallery.css';

export class Gallery extends Component {
	state = { count: 9, images: [], selectedImage: null };

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

	showImage = (e) => {
		const element = e.currentTarget,
			selectedImage = element.src;
		this.setState({ selectedImage });
	};

	closeImage = (e) => {
		this.setState({ selectedImage: null });
	};

	render() {
		const { images, selectedImage } = this.state;
		return (<div className="gallery">
			{images && images.map((image, idx) => <Image key={idx} imageBlob={image} onClick={this.showImage} />)}
			{selectedImage && (<figure>
				<img src={selectedImage} alt="" onClick={this.closeImage} className="loaded" />
			</figure>)}
		</div>);
	}
}

export const Image = ({ imageBlob, onClick }) => {
	let url = URL.createObjectURL(imageBlob);
	return (<img src={url} alt="" onClick={onClick} />);
};