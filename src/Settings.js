import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class Settings extends Component {
	setNum = (k) => (v) => {
		let obj = {}
		obj[k] = parseFloat(v.target.value)
		this.props.onChange(obj)
	}

	render() {
		return (
			<div className='Settings'>
				<FormGroup controlId='tickerSize'>
					<ControlLabel>Ticker Size</ControlLabel>
					<FormControl
						type='number'
						value={this.props.tickerSize}
						onChange={this.setNum('tickerSize')}
						min={1}
						max={10}
					/>
				</FormGroup>
			</div>
		)
	}
}

export default Settings
