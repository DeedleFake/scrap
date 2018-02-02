import React, { Component } from 'react'

import cmc from './coinmarketcap'

class App extends Component {
	state = {
		coins: [],
	}

	async componentDidMount() {
		try {
			let coins = await cmc.getTicker({limit: 3})
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
			<div className='App'>
				{this.state.coins.map((coin) => (
					<img
						key={coin.id}
						alt={coin.id}
						src={cmc.getImageURL(coin.id)}
					/>
				))}
			</div>
		)
	}
}

export default App
