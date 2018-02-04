import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

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
					This is not implemented yet.
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
