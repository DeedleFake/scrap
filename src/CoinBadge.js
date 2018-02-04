import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

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
				<Image
					className='Image'
					alt={this.props.coin.id}
					src={cmc.getImageURL(this.props.coin.id)}
					responsive={true}
				/>
				<Price
					price={this.props.coin.price_usd}
					format={'USD'}
				/>
			</a>
		)
	}
}

export default CoinBadge
