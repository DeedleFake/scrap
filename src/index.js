import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store, { updatePrices } from './store'

import './index.css'

setInterval(() => store.dispatch(updatePrices()), 30000)

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'))
