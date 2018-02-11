import React, { Component } from 'react'

class Total extends Component {
	calc = () => {
		if (!Object.keys(this.props.prices).length) {
			return 0
		}

		return this.props.purchases.reduce((acc, cur) => {
			switch (cur.from.type) {
				case 'fiat':
					if (!this.props.prices[cur.to.id]) {
						return acc
					}

					return acc + (cur.to.amount * this.props.prices[cur.to.id].usd)

				case 'crypto':
					if (!this.props.prices[cur.from.id] || !this.props.prices[cur.to.id]) {
						return acc
					}

					acc += cur.to.amount * this.props.prices[cur.to.id].usd
					acc -= cur.from.amount * cur.to.amount * this.props.prices[cur.from.id].usd
					return acc

				case 'received':
					if (!this.props.prices[cur.to.id]) {
						return acc
					}

					return acc + (cur.to.amount * this.props.prices[cur.to.id].usd)

				default:
					throw new Error(`Unsupported purchase type: ${cur.from.type}`)
			}
		}, 0)
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
