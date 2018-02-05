import React, { Component } from 'react'
import { Modal, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap'

class Add extends Component {
	state = {
		bought: 'crypto',
		boughtID: '',
		boughtAmount: 0,

		with: 'fiat',
		withID: '',
		withAmount: 0,
	}

	setVal = (k, f) => (ev) => {
		let obj = {}
		obj[k] = ev.target.value
		if (f) {
			obj[k] = f(obj[k])
		}

		this.setState(obj)
	}

	valid = () => false

	add = () => {
		throw new Error('Not implemented.')
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
						<ControlLabel>Bought</ControlLabel>

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
											onChange={this.setVal('boughtAmount', parseFloat)}
											placeholder='Amount...'
										/>
									</div>
								: null
							}
						</Well>
					</FormGroup>

					<FormGroup controlId='with'>
						<ControlLabel>With</ControlLabel>

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
						/>
					</FormGroup>

					<FormGroup controlId='notes'>
						<ControlLabel>Notes</ControlLabel>

						<FormControl
							componentClass='textarea'
						/>
					</FormGroup>
				</Modal.Body>

				<Modal.Footer>
					<Button
						bsStyle='primary'
						onClick={this.add}
						disabled={!this.valid()}
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
