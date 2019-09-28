import React, { Component } from 'react';

export class PokemonList extends Component {
	state = { limit: 0, offset: 0 };

	componentDidMount() {
		this.setState({
			limit: this.props.limit,
			offset: this.props.offset
		});
	}

	updateLimit = (e) => {
		this.params.updateLimit(e);
	};

	render() {
		const { limit, offset } = this.state, count = 10;
		return (<form>
			<label htmlFor="select-limit">Amount:</label>
			<select id="select-limit" value={this.state.limit} onChange={this.updateLimit}>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="15">15</option>
			</select>
			<div>Offset: {offset + 1} / {Math.ceil(count / limit) } pages</div>
			<div className="btn-group">
				<button className="btn" onClick={this.goPrev}
						disabled={offset <= 0}>&laquo;</button>
				<button className="btn" onClick={this.goNext}>&raquo;</button>
			</div>
		</form>);
	}
}