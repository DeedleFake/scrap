import { createStore, combineReducers } from 'redux'

import portfolio from './store/portfolio'
export * from './store/portfolio'

export default createStore(
	combineReducers({
		portfolio,
	}),
	window.devToolsExtension ? window.devToolsExtension() : (store) => store,
)
