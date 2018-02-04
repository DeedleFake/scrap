import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

import Settings from './Settings'
import Ticker from './Ticker'

const Configstore = window.require('configstore')

const defaultSettings = {
	tickerSize: 5,
}

class App extends Component {
	state = {
		lastUpdate: new Date(),
		modal: null,
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
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval)
		this.updateInterval = null
	}

	update = () => {
		this.setState({
			lastUpdate: new Date(),
		})
	}

	get settings() {
		return this.config.all
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

	render() {
		return (
			<div className='App'>
				<div className='toolbar'>
					<div className='left'>
					</div>

					<Ticker
						className='center'
						lastUpdate={this.state.lastUpdate}
						limit={this.state.tickerSize}
						direction={this.state.direction ? 'column' : 'row'}
					/>

					<div className='right'>
						<Button
							bsStyle='primary'
							onClick={() => this.showModal('add-coin')}
						>Add</Button>

						<Button
							bsStyle='info'
							onClick={() => this.showModal('settings')}
						>Settings</Button>
					</div>
				</div>

				<div className='main'>
				</div>

				<Modal show={this.state.modal === 'add-coin'} onHide={this.hideModal}>
					<Modal.Header closeButton>
						<Modal.Title>Add Coin</Modal.Title>
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
