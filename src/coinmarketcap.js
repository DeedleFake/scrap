import util from './util'

const parseFields = (struct) => {
	for (let [k, v] of Object.entries(struct)) {
		if (isNaN(v)) {
			continue
		}

		struct[k] = parseFloat(v)
	}

	return struct
}

const getCoinURL = (coin) => `https://coinmarketcap.com/currencies/${coin}`

const getImageURL = (coin) => `https://files.coinmarketcap.com/static/img/coins/32x32/${coin}.png`

const getTicker = async (coin, options) => {
	if (typeof(coin) !== 'string') {
		options = coin
		coin = ''
	}

	const q = options ? util.buildQuery(options) : ''
	let data = await util.get(`https://api.coinmarketcap.com/v1/ticker/${coin}?${q}`)

	data = JSON.parse(data)
	if (data.error) {
		throw new Error(data.error)
	}

	for (let i = 0; i < data.length; i++) {
		data[i] = parseFields(data[i])
	}

	return data
}

export default {
	getCoinURL,
	getImageURL,
	getTicker,
}
