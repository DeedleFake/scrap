import React, { Component } from 'react'
import { Alert, ListGroup, ListGroupItem } from 'react-bootstrap'

import CoinBadge from './CoinBadge'
import Total from './Total'

import { connect } from 'react-redux'

class CoinList extends Component {
	name = (id) => this.props.prices[id] ? this.props.prices[id].name : null

	symbol = (id) => this.props.prices[id] ? this.props.prices[id].symbol : null

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
								<div className='price'>
									<CoinBadge
										id={coin}
										price={this.price(coin)}
									/>
								</div>

								<div className='name'>
									{this.name(coin)}
								</div>

								<div className='owned'>
									<Total
										owned
										prices={this.props.prices}
										purchases={this.props.purchases}
										filter={(c) => c.id === coin}
									/>
									<span>{this.symbol(coin)}</span>
								</div>

								<div className='value'>
									<Total
										value
										prices={this.props.prices}
										purchases={this.props.purchases}
										filter={(c) => c.id === coin}
									/>
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
		purchases: state.portfolio.purchases,

		prices: state.prices,
	}),

	{
	},
)(CoinList)
