import { configReducer } from './global'

const SET_SETTING = 'SET_SETTING'
export const setSetting = (k, v) => ({
	type: SET_SETTING,
	key: k,
	val: v,
})

const initial = {
	portfolioLocation: null,
	tickerSize: 3,
}

export default configReducer((state = initial, action) => {
	switch (action.type) {
		case SET_SETTING:
			return [{
				...state,
				[action.key]: action.val,
			}, true]

		default:
			return [state, false]
	}
}, 'scrap', initial)
