import React, { Component } from 'react'

import CoinBadge from './CoinBadge'

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
			<div style={Object.assign(this.style().main, this.props.style || {})}>
				{this.state.coins.map((coin, i) => (
					<div key={coin.id} style={this.style().coin}>
						<CoinBadge
							coin={coin}
						/>
					</div>
				))}
			</div>
		)
	}
}

export default Ticker
