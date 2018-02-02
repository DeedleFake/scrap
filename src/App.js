import React, { Component } from 'react'
import EventEmitter from 'events'

import Ticker from './Ticker'

class App extends Component {
	state = {
		lastUpdate: new Date(),
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
			<div>
				<Ticker
					lastUpdate={this.state.lastUpdate}
					limit={5}
				/>
			</div>
		)
	}
}

export default App
