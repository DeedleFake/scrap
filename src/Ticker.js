import React, { Component } from 'react'

import CoinBadge from './CoinBadge'

import { connect } from 'react-redux'

class Ticker extends Component {
	render() {
		return (
			<div className={`Ticker ${this.props.className}`}>
				{this.props.ticker.map((coin, i) => (
					<div key={coin.id}>
						<CoinBadge
							id={coin.id}
							price={coin.usd}
							link
						/>
					</div>
				))}
			</div>
		)
	}
}

export default connect(
	(state) => ({
		ticker: state.ticker,
	}),

	{
	},
)(Ticker)
