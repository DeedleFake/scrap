import React, { Component } from 'react'

import Price from './Price'

class Total extends Component {
	get filter() {
		return this.props.filter || (() => true)
	}

	value = {
		fiat: (from, to) => {
			if (!this.props.prices[to.id] || !this.filter(to)) {
				return 0
			}

			return to.amount * this.props.prices[to.id].usd
		},

		crypto: (from, to) => {
			if (!this.props.prices[from.id] || !this.props.prices[to.id]) {
				return 0
			}

			let acc = 0
			if (this.filter(to)) {
				acc += to.amount * this.props.prices[to.id].usd
			}
			if (this.filter(from)) {
				acc -= from.amount * to.amount * this.props.prices[from.id].usd
			}
			return acc
		},

		received: (from, to) => {
			if (!this.props.prices[to.id] || !this.filter(to)) {
				return 0
			}

			return to.amount * this.props.prices[to.id].usd
		},
	}

	owned = {
		fiat: (from, to) => this.filter(to) ? to.amount : 0,
		crypto: (from, to) => {
			let acc = 0
			if (this.filter(to)) {
				acc += to.amount
			}
			if (this.filter(from)) {
				acc -= from.amount * to.amount
			}
			return acc
		},
		received: (from, to) => this.filter(to) ? to.amount : 0,
	}

	calc = (mode) => {
		if (!Object.keys(this.props.prices).length) {
			return 0
		}

		return this.props.purchases.reduce((acc, cur) => {
			if (!mode[cur.from.type]) {
				console.warn(`Unexpected purchase type: ${cur.from.type}`)
				return acc
			}

			return acc + mode[cur.from.type](cur.from, cur.to)
		}, 0)
	}

	render() {
		let c = this.value
		let fiat = true
		if (this.props.owned) {
			c = this.owned
			fiat = false
		}

		return (
			<div className='Total'>
				<Price
					price={this.calc(c)}
					fiat={fiat}
				/>
			</div>
		)
	}
}

export default Total
