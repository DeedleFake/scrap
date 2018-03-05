import React, { Component } from 'react'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import { FormControl, FormControlLabel, FormLabel, FormGroup, FormHelperText } from 'material-ui/Form'
import { withStyles } from 'material-ui/styles'

import cmc from './coinmarketcap'
import util from './util'

const preventDefault = (f) => (ev) => {
	ev.preventDefault()
	return f(ev)
}

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

const styles = (theme) => ({
	content: {
		display: 'flex',
		flexDirection: 'column',
	},

	spacer: {
		height: theme.spacing.unit * 2,
	},
})

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

		this.props.onAdd({
			from: {
				type: this.state.with,
				id: this.state.withID,
				amount: this.state.withAmount,
			},

			to: {
				type: this.state.bought,
				id: this.state.boughtID,
				amount: this.state.boughtAmount,
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

	with = (ev, type) => {
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
			<Dialog
				open={this.props.open}
				onClose={this.props.onClose}
				component={'form'}
				onSubmit={preventDefault(this.add)}
			>
				<DialogTitle>Add</DialogTitle>

				<DialogContent className={this.props.classes.content}>
					{this.show('bought')
						? <FormControl>
								<FormLabel>Bought</FormLabel>
								<FormGroup row>
									<TextField
										label='Coin'
										value={this.state.boughtID}
										onChange={this.setVal('boughtID')}
										disabled={!this.placeholder('bought')}
									/>

									<TextField
										label='Amount'
										type='number'
										min={0}
										value={this.state.boughtAmount}
										onChange={this.setVal('boughtAmount', parseFloat)}
									/>
								</FormGroup>
								<FormHelperText>Total amount bought.</FormHelperText>
							</FormControl>
						: null
					}

					<div className={this.props.classes.spacer} />

					<FormControl>
						<FormLabel>With</FormLabel>
						<RadioGroup
							row
							value={this.state.with}
							onChange={this.with}
						>
							<FormControlLabel
								control={<Radio />}
								label='Crypto'
								value='crypto'
							/>
							<FormControlLabel
								control={<Radio />}
								label='Fiat'
								value='fiat'
							/>
						</RadioGroup>
						<FormGroup row>
							<TextField
								label='Coin'
								value={this.state.withID}
								onChange={this.setVal('withID')}
								disabled={!this.placeholder('with')}
							/>
							<TextField
								label='Amount'
								type='number'
								min={0}
								value={this.state.withAmount}
								onChange={this.setVal('withAmount')}
							/>
						</FormGroup>
						<FormHelperText>Amount per coin bought.</FormHelperText>
					</FormControl>

					<div className={this.props.classes.spacer} />

					<FormControl>
						<FormLabel>Date</FormLabel>

						<TextField
							type='date'
							value={util.formatDate(this.state.date)}
							onChange={this.setVal('date', (v) => new Date(v))}
						/>
					</FormControl>

					<div className={this.props.classes.spacer} />

					<FormControl>
						<FormLabel>Notes</FormLabel>

						<TextField
							multiline
							rows={5}
							value={this.state.notes}
							onChange={this.setVal('notes')}
						/>
					</FormControl>
				</DialogContent>

				<DialogActions>
					<Button
						color='secondary'
						onClick={this.props.onClose}
					>Cancel</Button>
					<Button
						color='primary'
						onClick={this.add}
					>Add</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default withStyles(styles)(Add)
