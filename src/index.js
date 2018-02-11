import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store, { updatePrices, updateTicker } from './store'

import './index.css'

const update = () => {
	store.dispatch(updatePrices())
	store.dispatch(updateTicker())
}
setInterval(update, 30000)
update()

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'))
