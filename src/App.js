import React, { Component } from 'react'

import Ticker from './Ticker'

class App extends Component {
	state = {
		lastUpdate: new Date(),

		limit: 5,
		direction: false,
	}

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
			<div className='App'>
				<div className='toolbar'>
					<div className='left'>
					</div>

					<Ticker
						className='center'
						lastUpdate={this.state.lastUpdate}
						limit={this.state.limit}
						direction={this.state.direction ? 'column' : 'row'}
					/>

					<div className='right'>
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
