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

let addr = document.querySelector('#addr')
let lookup = document.querySelector('#lookup')
let output = document.querySelector('#output')

lookup.addEventListener('click', () => {
	iota.api.findTransactionObjects({'addresses': [addr.value]}, (err, data) => {
		if (err)
		{
			console.log(`Error: Failed to find transaction info: ${err}`)
			return
		}

		for (let i in data)
		{
			output.innerHTML += `<div>${data[i].value}</div>`
		}
	})
})
