import React, { Component } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'

import Total from './Total'
import Ticker from './Ticker'
import Settings from './Settings'
import CoinList from './CoinList'
import utils from './utils'

const Configstore = window.require('configstore')

const defaultSettings = {
	tickerSize: 5,
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
			let data = await utils.readFile(this.state.portfolioLocation)
			this.setState({
				portfolio: JSON.parse(data),
			})
		}
		catch (err) {
			console.error(`Failed to load portfolio: ${err}`)
		}
	}

	savePortfolio = async () => {
		try {
			await utils.writeFile(this.state.portfolioLocation, JSON.stringify(this.state.portfolio))
		}
		catch (err) {
			console.error(`Failed to save portfolio: ${err}`)
		}
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

				<Modal show={this.state.modal === 'add'} onHide={this.hideModal}>
					<Modal.Header closeButton>
						<Modal.Title>Add</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						This isn't implemented yet. Oh well.
					</Modal.Body>

					<Modal.Footer>
						<Button
							bsStyle='danger'
							onClick={this.hideModal}
						>Cancel</Button>
					</Modal.Footer>
				</Modal>

				<Modal show={this.state.modal === 'settings'} onHide={this.hideModal}>
					<Modal.Header closeButton>
						<Modal.Title>Settings</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Settings
							{...this.state}
							onChange={this.setSettings}
						/>
					</Modal.Body>

					<Modal.Footer>
						<Button
							bsStyle='primary'
							onClick={this.hideModal}
						>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

export default App
