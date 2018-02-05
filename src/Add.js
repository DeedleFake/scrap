import React, { Component } from 'react'
import { Modal, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap'

class Add extends Component {
	valid = () => false

	add = () => {
		throw new Error('Not implemented.')
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
								<Button>Fiat</Button>
								<Button>Crypto</Button>
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
								<Button>Fiat</Button>
								<Button>Crypto</Button>
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
