const ADD_PURCHASE = 'ADD_PURCHASE'
export const addPurchase = (from, to, date, notes) => ({
	type: ADD_PURCHASE,

	from,
	to,
	date,
	notes,
})

const initial = {
	coins: new Set(),
	purchases: [],
}

export default (state = initial, action) => {
	switch (action.type) {
		case ADD_PURCHASE:
			let p = [
				...state.purchases,
				{
					from: action.from,
					to: action.to,
					date: action.date,
					notes: action.notes,
				},
			]

			return {
				...state,
				coins: p.reduce((acc, cur) => {
					if (cur.from.type === 'crypto') {
						acc.add(cur.from.id)
					}
					if (cur.to.type === 'crypto') {
						acc.add(cur.to.id)
					}
					return acc
				}, new Set()),
				purchases: p,
			}

		default:
			return state
	}
}
