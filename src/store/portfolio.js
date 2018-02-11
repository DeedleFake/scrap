const ADD_PURCHASE = 'ADD_PURCHASE'
export const addPurchase = (from, to, date, notes) => ({
	type: ADD_PURCHASE,

	from,
	to,
	date,
	notes,
})

const initial = {
	purchases: [],
}

export default (state = initial, action) => {
	switch (action.type) {
		case ADD_PURCHASE:
			return {
				...state,
				purchases: [
					...state.purchases,
					{
						from: action.from,
						to: action.to,
						date: action.date,
						notes: action.notes,
					},
				],
			}

		default:
			return state
	}
}
