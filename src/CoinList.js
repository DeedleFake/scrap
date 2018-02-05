import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

class CoinList extends Component {
	render() {
		if (!this.props.portfolio || this.props.portfolio.empty()) {
			return (
				<Alert bsStyle='warning'>
					Portfolio appears to be empty. Click the Add button on the toolbar to add a new purchase.
				</Alert>
			)
		}

		return (
			<div className='CoinList'>
			</div>
		)
	}
}

export default CoinList
