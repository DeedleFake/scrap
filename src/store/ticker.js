import cmc from '../coinmarketcap'

const UPDATE_TICKER = 'UPDATE_TICKER'
export const updateTicker = () => async ({state, dispatch}) => {
	let data = await cmc.getTicker({
		limit: state.settings.tickerSize,
	})

	return dispatch({
		type: UPDATE_TICKER,

		data: data.map((v) => ({
			id: v.id,
			usd: parseFloat(v.price_usd),
			btc: parseFloat(v.price_btc),
		})),
	})
}

const initial = []

export default (state = initial, action) => {
	switch (action.type) {
		case UPDATE_TICKER:
			return action.data

		default:
			return state
	}
}
