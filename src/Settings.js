import React, { Component } from 'react'
import { Modal, Button, FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap'

const { dialog, getCurrentWindow } = window.require('electron').remote

class Settings extends Component {
	setNum = (k) => (v) => {
		if (typeof(v) !== 'string') {
			v = v.target.value
		}

		let obj = {}
		obj[k] = parseFloat(v)
		this.props.onChange(obj)
	}

	setString = (k) => (v) => {
		if (typeof(v) !== 'string') {
			v = v.target.value
		}

		let obj = {}
		obj[k] = v
		this.props.onChange(obj)
	}

	setPortfolioLocation = (ev) => {
		let path = dialog.showSaveDialog(getCurrentWindow())
		if (!path) {
			return
		}

		this.setString('portfolioLocation')(path)
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>Settings</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className='Settings'>
						<FormGroup controlId='portfolioLocation'>
							<ControlLabel>Portfolio Location</ControlLabel>

							<Well bsStyle='row'>
								<FormControl
									type='text'
									readOnly
									value={this.props.portfolioLocation || 'No location chosen.'}
								/>
								<Button
									bsStyle='primary'
									onClick={this.setPortfolioLocation}
								>Browse</Button>
							</Well>
						</FormGroup>

						<FormGroup controlId='tickerSize'>
							<ControlLabel>Ticker Size</ControlLabel>

							<Well bsStyle='row'>
								<FormControl
									type='number'
									value={this.props.tickerSize}
									onChange={this.setNum('tickerSize')}
									min={1}
									max={10}
								/>
							</Well>
						</FormGroup>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button
						bsStyle='primary'
						onClick={this.props.onHide}
					>Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default Settings
