import React, { Component } from 'react'
import { Modal, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap'

import cmc from './coinmarketcap'
import util from './util'

const defaultState = {
	bought: 'crypto',
	boughtID: '',
	boughtAmount: 0,

	with: 'fiat',
	withID: '',
	withAmount: 0,

	date: new Date(),
	notes: '',
}

class Add extends Component {
	state = defaultState

	setVal = (k, f) => (ev) => {
		let obj = {}
		obj[k] = ev.target.value
		if (f) {
			obj[k] = f(obj[k])
		}

		this.setState(obj)
	}

	valid = async () => {
		try {
			let check = []

			if (this.state.bought === 'crypto') {
				check.push(cmc.getTicker(this.state.boughtID))
			}

			if (this.state.with === 'crypto') {
				check.push(cmc.getTicker(this.state.withID))
			}

			await Promise.all(check)

			return true
		}
		catch (err) {
			console.error(`Failed to validate: ${err}`)
			return false
		}
	}

	add = async () => {
		if (!await this.valid()) {
			return
		}

		const id = this.state.bought === 'crypto' ? this.state.boughtID : this.state.bought
		this.props.onAdd(id, {
			amount: isNaN(this.state.boughtAmount) ? 0 : this.state.boughtAmount,

			with: {
				type: this.state.with,
				id: this.state.withID,
				amount: isNaN(this.state.withAmount) ? 0 : this.state.withAmount,
			},

			date: this.state.date,
			notes: this.state.notes,
		})

		this.setState(defaultState)
	}

	bought = (type) => () => {
		this.setState({
			bought: type,
			boughtID: '',
		})
	}

	with = (type) => () => {
		this.setState({
			with: type,
			withID: '',
		})
	}

	show = (k) => {
		switch (this.state[k]) {
			case 'crypto':
			case 'fiat':
				return true

			default:
				return false
		}
	}

	placeholder = (k) => {
		switch (this.state[k]) {
			case 'crypto':
				return 'Coin...'

			default:
				return null
		}
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Add</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<FormGroup controlId='bought'>
						<ControlLabel>Bought (Total)</ControlLabel>

						<Well bsStyle='column'>
							<ButtonGroup>
								<Button
									onClick={this.bought('crypto')}
									disabled={this.state.bought === 'crypto'}
								>Crypto</Button>
								<Button
									onClick={this.bought('fiat')}
									disabled={this.state.bought === 'fiat'}
								>Fiat</Button>
							</ButtonGroup>

							{this.show('bought')
								? <div className='flex-row'>
										<FormControl
											type='text'
											value={this.state.boughtID}
											onChange={this.setVal('boughtID')}
											placeholder={this.placeholder('bought')}
											disabled={!this.placeholder('bought')}
										/>

										<FormControl
											type='number'
											value={this.state.boughtAmount}
											min={0}
											onChange={this.setVal('boughtAmount', parseFloat)}
											placeholder='Amount...'
										/>
									</div>
								: null
							}
						</Well>
					</FormGroup>

					<FormGroup controlId='with'>
						<ControlLabel>With (Per Coin Bought)</ControlLabel>

						<Well bsStyle='column'>
							<ButtonGroup>
								<Button
									onClick={this.with('crypto')}
									disabled={this.state.with === 'crypto'}
								>Crypto</Button>
								<Button
									onClick={this.with('fiat')}
									disabled={this.state.with === 'fiat'}
								>Fiat</Button>
								<Button
									onClick={this.with('mined')}
									disabled={this.state.with === 'mined'}
								>Mined</Button>
								<Button
									onClick={this.with('used')}
									disabled={this.state.with === 'used'}
								>Used</Button>
							</ButtonGroup>

							{this.show('with')
								? <div className='flex-row'>
										<FormControl
											type='text'
											value={this.state.withID}
											onChange={this.setVal('withID')}
											placeholder={this.placeholder('with')}
											disabled={!this.placeholder('with')}
										/>

										<FormControl
											type='number'
											value={this.state.withAmount}
											min={0}
											onChange={this.setVal('withAmount', parseFloat)}
										/>
									</div>
								: null
							}
						</Well>
					</FormGroup>

					<FormGroup controlId='date'>
						<ControlLabel>Date</ControlLabel>

						<FormControl
							type='date'
							value={util.formatDate(this.state.date)}
							onChange={this.setVal('date', (v) => new Date(v))}
						/>
					</FormGroup>

					<FormGroup controlId='notes'>
						<ControlLabel>Notes</ControlLabel>

						<FormControl
							componentClass='textarea'
							value={this.state.notes}
							onChange={this.setVal('notes')}
						/>
					</FormGroup>
				</Modal.Body>

				<Modal.Footer>
					<Button
						bsStyle='primary'
						onClick={this.add}
					>Add</Button>
					<Button
						bsStyle='danger'
						onClick={this.props.onHide}
					>Cancel</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default Add
