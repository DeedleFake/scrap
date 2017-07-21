const IOTA = require('iota.lib.js')

let iota = new IOTA({
	'host': 'http://iota.bitfinex.com',
	'port': 80,
	'sandbox': true,
})
iota.api.getNodeInfo((err, data) => {
	if (err)
	{
		console.log(`Error: Failed to get node information: ${err}`)
		return
	}

	console.log(data)
})

let seed = document.querySelector('#seed')
let lookup = document.querySelector('#lookup')
let output = document.querySelector('#output')

lookup.addEventListener('click', () => {
	const s = seed.value

	if (!iota.valid.isTrytes(s))
	{
		output.innerHTML = 'Invalid seed.'
		return
	}

	iota.api.getAccountData(s, (err, data) => {
		if (err)
		{
			console.log(`Error: Failed to get account data: ${err}`)
			return
		}

		console.log(data)
		output.innerHTML = data.balance
	})
})
