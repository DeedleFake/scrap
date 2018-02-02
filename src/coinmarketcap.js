import http from 'http'

const getImageURL = (coin) => {
	return `https://files.coinmarketcap.com/static/img/coins/32x32/${coin}.png`
}

const getTicker = async (options) => {
	const q = Object.entries(options).map(([k, v]) => (
		`${encodeURIComponent(k)}=${encodeURIComponent(v)}`
	)).join('&')

	return await new Promise((resolve, reject) => {
		http.get(`https://api.coinmarketcap.com/v1/ticker?${q}`, (res) => {
			let data = ''
			res.on('data', (part) => data += part)
			res.on('end', () => resolve(JSON.parse(data)))
			res.on('error', (err) => reject(err))
		})
	})
}

export default {
	getTicker,
	getImageURL,
}
