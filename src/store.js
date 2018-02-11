import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import settings from './store/settings'
import portfolio from './store/portfolio'
import prices from './store/prices'
import ticker from './store/ticker'

export * from './store/settings'
export * from './store/portfolio'
export * from './store/prices'
export * from './store/ticker'

const midAsync = (store) => (next) => (action) => {
	if (action instanceof Function) {
		return action({
			state: store.getState(),
			dispatch: next,
		})
	}

	if (action instanceof Promise) {
		return action.then(next)
	}

	return next(action)
}

const composeDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
	combineReducers({
		settings,
		portfolio,
		prices,
		ticker,
	}),
	{},
	composeDevtools(
		applyMiddleware(midAsync),
	),
)
