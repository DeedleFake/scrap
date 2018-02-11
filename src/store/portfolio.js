import util from '../util'

const ADD_PURCHASE = 'ADD_PURCHASE'
export const addPurchase = ({from, to, date, notes}) => ({
	type: ADD_PURCHASE,

	from,
	to,
	date,
	notes,
})

const LOAD_PORTFOLIO = 'LOAD_PORTFOLIO'
export const loadPortfolio = () => async ({state, dispatch}) => {
	let portfolio = await util.readFile(state.settings.portfolioLocation)
	return dispatch({
		type: LOAD_PORTFOLIO,
		portfolio: util.fromJSON(portfolio),
	})
}

const CLEAR_PORTFOLIO = 'CLEAR_PORTFOLIO'
export const clearPortfolio = () => ({
	type: CLEAR_PORTFOLIO,
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

		case LOAD_PORTFOLIO:
			return action.portfolio

		case CLEAR_PORTFOLIO:
			return initial

		default:
			return state
	}
}
