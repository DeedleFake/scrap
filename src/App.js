import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'

import Total from './Total'
import Ticker from './Ticker'
import CoinList from './CoinList'
import Add from './Add'
import Settings from './Settings'
import Coin from './Coin'

import util from './util'

import { connect } from 'react-redux'
import {
	addPurchase,
	loadPortfolio,

	updatePrices,
} from './store'

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
			<div className='App'>
				<div className='toolbar'>
					<div className='left'>
						<Total
							prices={this.props.prices}
							purchases={this.props.portfolio.purchases}
						/>
					</div>

					<div className='center'>
						<Ticker />
					</div>

					<div className='right'>
						<Button
							bsStyle='primary'
							onClick={() => this.showModal('add')}
							disabled={!this.props.portfolioLocation}
						>Add</Button>

						<Button
							bsStyle='info'
							onClick={() => this.showModal('settings')}
						>Settings</Button>
					</div>
				</div>

				<div className='main'>
					{!this.props.portfolioLocation
						? <Alert bsStyle='danger'>
								No portfolio location chosen. Please do so in Settings.
							</Alert>
						: <CoinList
								showCoin={(coin) => this.showModal('coin', coin)}
							/>
					}
				</div>

				<Add
					show={this.modalShown('add')}
					onHide={this.hideModal}

					onAdd={this.add}
				/>

				<Settings
					show={this.modalShown('settings')}
					onHide={this.hideModal}
				/>

				<Coin
					show={this.modalShown('coin')}
					onHide={this.hideModal}

					coin={this.state.modal.args[0]}
				/>
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
)(App)
