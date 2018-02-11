import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'

import Total from './Total'
import Ticker from './Ticker'
import CoinList from './CoinList'
import Add from './Add'
import Settings from './Settings'

import util from './util'

import { connect } from 'react-redux'
import {
	addPurchase,
	loadPortfolio,

	updatePrices,
} from './store'

class App extends Component {
	state = {
		modal: null,
	}

	async componentDidMount() {
		await this.props.loadPortfolio()
		await this.props.updatePrices()
	}

	showModal = (name) => {
		this.setState({
			modal: name,
		})
	}

	hideModal = () => {
		this.setState({
			modal: null,
		})
	}

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
						: <CoinList />
					}
				</div>

				<Add
					show={this.state.modal === 'add'}
					onHide={this.hideModal}

					onAdd={this.add}
				/>

				<Settings
					show={this.state.modal === 'settings'}
					onHide={this.hideModal}
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
