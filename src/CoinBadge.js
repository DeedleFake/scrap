import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import Price from './Price'

import cmc from './coinmarketcap'

class CoinBadge extends Component {
	render() {
		return (
			<div className='CoinBadge'>
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
			</div>
		)
	}
}

export default CoinBadge
