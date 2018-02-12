import cmc from '../coinmarketcap'

const UPDATE_PRICES = 'UPDATE_PRICES'
export const updatePrices = () => async ({state, dispatch}) => {
	if (!state.portfolio.coins.size) {
		return
	}

	let data = await Promise.all([...state.portfolio.coins].map(async (id) => (await cmc.getTicker(id))[0]))
	return dispatch({
		type: UPDATE_PRICES,
		prices: data.reduce((acc, cur) => {
			acc[cur.id] = {
				name: cur.name,
				symbol: cur.symbol,
				usd: parseFloat(cur.price_usd),
				btc: parseFloat(cur.price_btc),
			}
			return acc
		}, {}),
	})
}

const initial = {}

export default (state = initial, action) => {
	switch (action.type) {
		case UPDATE_PRICES:
			return action.prices

		default:
			return state
	}
}
