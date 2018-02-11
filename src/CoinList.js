import React, { Component } from 'react'
import { Alert, ListGroup, ListGroupItem } from 'react-bootstrap'

import CoinBadge from './CoinBadge'

import { connect } from 'react-redux'

class CoinList extends Component {
	price = (id) => this.props.prices[id] ? this.props.prices[id].usd : -1

	render() {
		if (!this.props.coins || !this.props.coins.size) {
			return (
				<Alert bsStyle='warning'>
					Portfolio appears to be empty. Click the Add button on the toolbar to add a new purchase.
				</Alert>
			)
		}

		return (
			<div className='CoinList'>
				<ListGroup>
					{[...this.props.coins].map((coin) => (
						<ListGroupItem key={coin} onClick={() => this.props.showCoin(coin)}>
							<div className='Item'>
								<div className='left'>
									<CoinBadge
										id={coin}
										price={this.price(coin)}
									/>
								</div>

								<div className='right'>
								</div>
							</div>
						</ListGroupItem>
					))}
				</ListGroup>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		coins: state.portfolio.coins,

		prices: state.prices,
	}),

	{
	},
)(CoinList)
