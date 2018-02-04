import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'

import Ticker from './Ticker'

class App extends Component {
	state = {
		lastUpdate: new Date(),

		limit: 5,
		direction: false,

		modal: null,
	}

	componentDidMount() {
		this.updateInterval = setInterval(this.update, 30000)
		this.update()
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval)
	}

	update = () => {
		this.setState({
			lastUpdate: new Date(),
		})
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
						limit={this.state.limit}
						direction={this.state.direction ? 'column' : 'row'}
					/>

					<div className='right'>
						<Button
							bsStyle='primary'
							onClick={() => this.showModal('add')}
						>Add</Button>
					</div>
				</div>

				<div className='main'>
				</div>

				<Modal show={this.state.modal === 'add'} onHide={this.hideModal}>
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
			</div>
		)
	}
}

export default App
