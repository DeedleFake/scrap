import React, { Component } from 'react'

import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

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
				<Typography color='error'>
					Portfolio appears to be empty. Click the Add button on the toolbar to add a new purchase.
				</Typography>
			)
		}

		return (
			<div className='CoinList'>
				<List>
					{[...this.props.coins].map((coin) => (
						<ListItem key={coin} button onClick={() => this.props.showCoin(coin)}>
							<ListItemIcon><Avatar>
								<CoinBadge
									id={coin}
									price={this.price(coin)}
								/>
							</Avatar></ListItemIcon>

							<ListItemText
								primary={this.name(coin)}
							/>

							<ListItemText
								primary={
									<Total
										owned
										prices={this.props.prices}
										purchases={this.props.purchases}
										filter={(c) => c.id === coin}
									/>
								}
								secondary={
									<Total
										value
										prices={this.props.prices}
										purchases={this.props.purchases}
										filter={(c) => c.id === coin}
									/>
								}
							/>
						</ListItem>
					))}
				</List>
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
