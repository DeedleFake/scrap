import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap'

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
		)
	}
}

export default Settings
