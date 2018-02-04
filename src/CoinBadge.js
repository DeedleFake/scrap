import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import Price from './Price'

import cmc from './coinmarketcap'

class CoinBadge extends Component {
	style = () => ({
		main: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',

			backgroundColor: '#CCCCCC',
			borderRadius: '4px',
			padding: '4px',
			margin: '4px',
			height: '32px',
		},

		image: {
			margin: '4px',
		},
	})

	render() {
		return (
			<div style={this.style().main}>
				<Image
					style={this.style().image}
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
