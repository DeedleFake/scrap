import React, { Component } from 'react'

class Price extends Component {
	render() {
		let format = this.props.format || 'USD'

		return (
			<span>
				{this.props.fiat
					? this.props.price.toLocaleString('en-US', {
							style: 'currency',
							currency: format,
						})
					: this.props.price.toLocaleString('en-US')
				}
			</span>
		)
	}
}

export default Price
