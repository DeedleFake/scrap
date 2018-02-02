import React, { Component } from 'react'

import cmc from './coinmarketcap'

class Ticker extends Component {
	state = {
		coins: [],
	}

	styles = () => ({
		main: {
			display: 'flex',
			flexDirection: this.props.direction || 'row',
			justifyContent: 'space-around',
		},

		coin: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
	})

	componentWillReceiveProps(props) {
		this.update(props)
	}

	update = async (props) => {
		if (!props) {
			props = this.props
		}

		try {
			let coins = await cmc.getTicker({limit: props.limit || 5})
			this.setState({
				coins: coins,
			})
		}
		catch (err) {
			console.error(`Failed to get ticker: ${err}`)
		}
	}

	render() {
		return (
			<div style={this.styles().main}>
				{this.state.coins.map((coin) => (
					<div key={coin.id} style={this.styles().coin}>
						<img
							alt={coin.id}
							src={cmc.getImageURL(coin.id)}
						/>
						<span>${coin.price_usd}</span>
					</div>
				))}
			</div>
		)
	}
}

export default Ticker
