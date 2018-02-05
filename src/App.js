import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'

import Total from './Total'
import Ticker from './Ticker'
import CoinList from './CoinList'
import Add from './Add'
import Settings from './Settings'

import Portfolio from './Portfolio'
import util from './util'

const Configstore = window.require('configstore')

const defaultSettings = {
	tickerSize: 3,
	portfolioLocation: null,
}

class App extends Component {
	state = {
		lastUpdate: new Date(),
		modal: null,

		prices: {},
		portfolio: null,
	}

	componentWillMount() {
		if (!this.config) {
			this.config = new Configstore('scrap', defaultSettings)
			this.setState(this.config.all)
		}
	}

	componentDidMount() {
		if (!this.updateInterval) {
			this.updateInterval = setInterval(this.update, 30000)
		}
		this.update()
		this.loadPortfolio()
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval)
		this.updateInterval = null
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.portfolioLocation !== prevState.portfolioLocation) {
			this.loadPortfolio()
		}
	}

	update = async () => {
		this.setState({
			lastUpdate: new Date(),
		})
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
			this.setState({
				portfolio: new Portfolio(JSON.parse(data)),
			})
		}
		catch (err) {
			// TODO: Show an error to the user?
			console.error(`Failed to load portfolio: ${err}`)
			this.setState({
				portfolio: new Portfolio(),
			})
		}
	}

	savePortfolio = async () => {
		await util.writeFile(this.state.portfolioLocation, JSON.stringify(this.state.portfolio))
	}

	add = async (coin, purchase) => {
		let portfolio = new Portfolio(this.state.portfolio)
		portfolio.add(coin, purchase)

		this.setState({
			portfolio: portfolio,
		})
		await this.savePortfolio()

		this.hideModal()
	}

	render() {
		return (
			<div className='App'>
				<div className='toolbar'>
					<div className='left'>
						<Total
							prices={this.state.prices}
							portfolio={this.state.portfolio}
						/>
					</div>

					<Ticker
						className='center'
						lastUpdate={this.state.lastUpdate}
						limit={this.state.tickerSize}
					/>

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
						: <CoinList
								prices={this.state.prices}
								portfolio={this.state.portfolio}
							/>
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

export default App
