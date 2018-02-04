import React, { Component } from 'react'

class Price extends Component {
	render() {
		let format = this.props.format || 'USD'

		return (
			<span>
				{this.props.price.toLocaleString('en-US', {
					style: 'currency',
					currency: format,
				})}
			</span>
		)
	}
}

export default Price
