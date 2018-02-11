import React, { Component } from 'react'
import { Modal, Button, FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap'

import { connect } from 'react-redux'
import {
	loadPortfolio,
	clearPortfolio,

	setSetting,

	updateTicker,
} from './store'

const fs = window.require('fs')
const { dialog, getCurrentWindow } = window.require('electron').remote

class Settings extends Component {
	setVal = (k, f, after) => (ev) => {
		this.props.setSetting(k, ((f || ((v) => v))(ev.target.value)))
		if (after) {
			after()
		}
	}

	setPortfolioLocation = async (ev) => {
		let path = dialog.showSaveDialog(getCurrentWindow(), {
			title: 'Choose portfolio location...',
			defaultPath: fs.existsSync(this.props.portfolioLocation) ? this.props.portfolioLocation : '',
			buttonLabel: 'Select',
			filters: [
				{
					name: 'JSON',
					extensions: [
						'json',
					],
				},
			],
		})
		if (!path) {
			return
		}

		this.props.setSetting('portfolioLocation', path)
		try {
			await this.props.loadPortfolio()
		}
		catch (err) {
			console.error(`Failed to load portfolio: ${err}`)
			this.props.clearPortfolio()
		}
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
									onChange={this.setVal('tickerSize', parseFloat, this.props.updateTicker)}
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

export default connect(
	(state) => ({
		portfolioLocation: state.settings.portfolioLocation,
		tickerSize: state.settings.tickerSize,
	}),

	{
		loadPortfolio,
		clearPortfolio,

		setSetting,

		updateTicker,
	},
)(Settings)
