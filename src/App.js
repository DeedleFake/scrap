import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import Total from './Total'
import Ticker from './Ticker'
import CoinList from './CoinList'
import Add from './Add'
//import Settings from './Settings'
//import Coin from './Coin'

import util from './util'

import { connect } from 'react-redux'
import {
	addPurchase,
	loadPortfolio,

	updatePrices,
} from './store'

const styles = (theme) => ({
	root: {
		postion: 'absolute',
		top: theme.mixins.toolbar.minHeight + theme.spacing.unit,
		bottom: 0,
		left: 0,
		right: 0,
	},

	spacer: {
		flex: 1,
	},
})

class App extends Component {
	state = {
		modal: {
			name: null,
			args: [],
		},
	}

	async componentDidMount() {
		await this.props.loadPortfolio()
		await this.props.updatePrices()
	}

	showModal = (name, ...args) => {
		this.setState({
			modal: {name, args},
		})
	}

	hideModal = () => {
		this.setState({
			modal: {
				name: null,
				args: [],
			},
		})
	}

	modalShown = (name) => this.state.modal.name === name

	savePortfolio = async () => {
		await util.writeFile(this.props.portfolioLocation, util.toJSON(this.props.portfolio))
	}

	add = async ({from, to, date, notes}) => {
		this.props.addPurchase({from, to, date, notes})
		await Promise.all([
			this.savePortfolio(),
			this.props.updatePrices(),
		])

		this.hideModal()
	}

	render() {
		return (
			<div className={this.props.classes.root}>
				<AppBar>
					<Toolbar>
						<Typography variant='title' color='inherit'>
							<Total
								prices={this.props.prices}
								purchases={this.props.portfolio.purchases}
							/>
						</Typography>

						<div className={this.props.classes.spacer} />

						<Ticker />

						<div className={this.props.classes.spacer} />

						<Button
							onClick={() => this.showModal('add')}
							disabled={!this.props.portfolioLocation}
						>Add</Button>

						<Button
							onClick={() => this.showModal('settings')}
						>Settings</Button>
					</Toolbar>
				</AppBar>

				<div>
					{!this.props.portfolioLocation
						? <Typography color='error'>
								No portfolio location chosen. Please do so in Settings.
							</Typography>
						: <CoinList
								showCoin={(coin) => this.showModal('coin', coin)}
							/>
					}
				</div>

				<Add
					open={this.modalShown('add')}
					onClose={this.hideModal}

					onAdd={this.add}
				/>

				{/*<Settings
					show={this.modalShown('settings')}
					onHide={this.hideModal}
				/>*/}

				{/*<Coin
					show={this.modalShown('coin')}
					onHide={this.hideModal}

					coin={this.state.modal.args[0]}
				/>*/}
			</div>
		)
	}
}

export default connect(
	(state) => ({
		portfolioLocation: state.settings.portfolioLocation,

		portfolio: state.portfolio,

		prices: state.prices,
	}),

	{
		addPurchase,
		loadPortfolio,

		updatePrices,
	},
)(withStyles(styles)(App))
