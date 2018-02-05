class Portfolio {
	constructor(obj) {
		Object.assign(this, obj || {
			coins: {},
		})
	}

	empty = () => !Object.keys(this.coins).length

	add = (id, purchase) => {
		if (!this.coins[id]) {
			this.coins[id] = new Portfolio.Coin(id)
		}

		this.coins[id].add(purchase)
	}

	static Coin = class {
		constructor(id, purchases) {
			Object.assign(this, {
				id: id,
				purchases: purchases || [],
			})
		}

		add = (purchase) => {
			this.purchases.push(purchase)
			this.purchases.sort((a, b) => b - a)
		}
	}
}

export default Portfolio
