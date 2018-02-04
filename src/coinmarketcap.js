import http from 'http'

const parseFields = (struct) => {
	for (let [k, v] of Object.entries(struct)) {
		if (isNaN(v)) {
			continue
		}

		struct[k] = parseFloat(v)
	}

	return struct
}

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
			res.on('end', () => {
				let json = JSON.parse(data)
				for (let i = 0; i < json.length; i++) {
					json[i] = parseFields(json[i])
				}

				resolve(json)
			})
			res.on('error', (err) => reject(err))
		})
	})
}

export default {
	getTicker,
	getImageURL,
}
