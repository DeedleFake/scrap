import React, { Component } from 'react'

import cmc from './coinmarketcap'

const styles = {
	main: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},

	coin:{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}

class Ticker extends Component {
	state = {
		coins: [],
	}

	componentWillReceiveProps() {
		this.update()
	}

	update = async () => {
		try {
			console.log('Updating ticker...')

			let coins = await cmc.getTicker({limit: 5})
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
			<div style={styles.main}>
				{this.state.coins.map((coin) => (
					<div key={coin.id} style={styles.coin}>
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
