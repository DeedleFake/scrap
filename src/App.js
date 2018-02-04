import React, { Component } from 'react'

import Ticker from './Ticker'

class App extends Component {
	state = {
		lastUpdate: new Date(),

		limit: 5,
		direction: false,
	}

	style = () => ({
		main: {
			display: 'flex',
			flexDirection: 'column',
		},

		toolbar: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',

			flex: '0 0 48px',
			padding: '4px',
			backgroundColor: '#AAAAAA',
		},

		toolbarRight: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-end',
		},

		coinList: {
			display: 'flex',
			flexDirection: 'column',

			overflow: 'auto',
		},
	})

	componentDidMount() {
		this.updateInterval = setInterval(this.update, 30000)
		this.update()
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval)
	}

	update = () => {
		this.setState({
			lastUpdate: new Date(),
		})
	}

	render() {
		return (
			<div style={this.style().main}>
				<div style={this.style().toolbar}>
					<div style={this.style().toolbarLeft}>
					</div>

					<Ticker
						lastUpdate={this.state.lastUpdate}
						limit={this.state.limit}
						direction={this.state.direction ? 'column' : 'row'}
					/>

					<div style={this.style().toolbarRight}>
						<input type='button' value='--' onClick={() => {
							this.setState({
								limit: this.state.limit - 1,
							})
						}} />
						<input type='button' value='Switch Direction' onClick={() => {
							this.setState({
								direction: !this.state.direction,
							})
						}} />
						<input type='button' value='++' onClick={() => {
							this.setState({
								limit: this.state.limit + 1,
							})
						}} />
					</div>
				</div>
			</div>
		)
	}
}

export default App
