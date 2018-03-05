import React, { Component } from 'react'

import Price from './Price'

import cmc from './coinmarketcap'

const { shell } = window.require('electron')

class CoinBadge extends Component {
	openCoin = () => {
		shell.openExternal(cmc.getCoinURL(this.props.coin.id))
	}

	render() {
		return (
			<a
				className={`CoinBadge ${!this.props.link ? 'not-link' : ''}`}
				onClick={this.props.link ? this.openCoin : null}
			>
				<img
					alt={this.props.id}
					src={cmc.getImageURL(this.props.id)}
				/>
				<Price
					price={this.props.price}
					format={'USD'}
				/>
			</a>
		)
	}
}

export default CoinBadge
