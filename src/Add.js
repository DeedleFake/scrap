import React, { Component } from 'react'
import { Modal, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap'

class Add extends Component {
	state = {
		bought: 'crypto',
		with: 'fiat',
	}

	valid = () => false

	add = () => {
		throw new Error('Not implemented.')
	}

	bought = (type) => () => {
		this.setState({
			bought: type,
		})
	}

	with = (type) => () => {
		this.setState({
			with: type,
		})
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

							<FormControl
								type='text'
								placeholder='Coin...'
							/>
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

							<FormControl
								type='text'
								placeholder='Coin...'
							/>
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
