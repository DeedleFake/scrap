import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import Price from './Price'

import cmc from './coinmarketcap'

class Ticker extends Component {
	state = {
		coins: [],
	}

	style = () => ({
		main: {
			display: 'flex',
			flexDirection: this.props.direction || 'row',
			justifyContent: 'space-around',
		},

		coin: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			margin: '8px',
			height: '32px',
		},

		coinImage: {
			margin: '4px',
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
			<div style={this.style().main}>
				{this.state.coins.map((coin) => (
					<div key={coin.id} style={this.style().coin}>
						<Image
							style={this.style().coinImage}
							alt={coin.id}
							src={cmc.getImageURL(coin.id)}
							responsive={true}
						/>
						<Price
							price={coin.price_usd}
							format={'USD'}
						/>
					</div>
				))}
			</div>
		)
	}
}

export default Ticker
