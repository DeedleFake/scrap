import React, { Component } from 'react'

class Total extends Component {
	calc = () => {
		if (!this.props.portfolio) {
			return 0
		}

		let sum = 0
		for (let [id, coin] of Object.entries(this.props.portfolio.coins)) {
			for (let purchase of coin.purchases) {
				try {
					switch (purchase.with.type) {
						case 'fiat':
							sum += purchase.amount * purchase.with.amount
							break

						case 'crypto':
							sum += purchase.amount * this.props.data[id].usd
							sum -= purchase.with.amount * this.props.data[purchase.with.id].usd
							break

						case 'mined':
							sum += purchase.amount * this.props.data[id].usd
							break

						case 'used':
							throw new Error('Not implemented.')

						default:
							throw new Error(`Unexpected purchase type: ${purchase.with.type}`)
					}
				}
				catch (err) {
					console.error(`Failed to add purchase: ${err}`)
				}
			}
		}

		return sum
	}

	render() {
		return (
			<div className='Total'>
				{this.calc().toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})}
			</div>
		)
	}
}

export default Total
