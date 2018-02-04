import React, { Component } from 'react'

class Toolbar extends Component {
	style = () => ({
		main: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',

			flex: '0 0 48px',
			padding: '4px',
			backgroundColor: '#AAAAAA',
		},
	})

	render() {
		return (
			<div style={this.style().main}>
				{this.props.children}
			</div>
		)
	}
}

export default Toolbar
