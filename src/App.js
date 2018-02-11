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
	setPortfolio,

	updatePrices,
} from './store'

const Configstore = window.require('configstore')

const defaultSettings = {
	tickerSize: 3,
	portfolioLocation: null,
}

class App extends Component {
	state = {
		modal: null,
	}

	componentWillMount() {
		if (!this.config) {
			this.config = new Configstore('scrap', defaultSettings)
			this.setState(this.config.all)
		}
	}

	async componentDidMount() {
		await this.loadPortfolio()
		await this.props.updatePrices()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.portfolioLocation !== prevState.portfolioLocation) {
			this.loadPortfolio()
		}
	}

	setSettings = (obj) => {
		this.config.set(obj)
		this.setState(obj)
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

	loadPortfolio = async () => {
		try {
			let data = await util.readFile(this.state.portfolioLocation)
			this.props.setPortfolio(util.fromJSON(data))
		}
		catch (err) {
			// TODO: Show an error to the user?
			console.error(`Failed to load portfolio: ${err}`)
		}
	}

	savePortfolio = async () => {
		await util.writeFile(this.state.portfolioLocation, util.toJSON(this.props.portfolio))
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
							disabled={!this.state.portfolioLocation}
						>Add</Button>

						<Button
							bsStyle='info'
							onClick={() => this.showModal('settings')}
						>Settings</Button>
					</div>
				</div>

				<div className='main'>
					{!this.state.portfolioLocation
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

					{...this.state}
					onChange={this.setSettings}
				/>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		portfolio: state.portfolio,

		prices: state.prices,
	}),

	{
		addPurchase,
		setPortfolio,

		updatePrices,
	},
)(App)
