import http from 'http'

const fs = window.require('fs')

export default {
	readFile: async (path, options) => {
		return await new Promise((resolve, reject) => {
			fs.readFile(path, options, (err, data) => {
				if (err) {
					return reject(err)
				}

				return resolve(data)
			})
		})
	},

	writeFile: async (path, data, options) => {
		return await new Promise((resolve, reject) => {
			fs.writeFile(path, data, options, (err) => {
				if (err) {
					return reject(err)
				}

				return resolve()
			})
		})
	},

	buildQuery: (options) => Object.entries(options).map(([k, v]) => (
		`${encodeURIComponent(k)}=${encodeURIComponent(v)}`
	)).join('&'),

	get: async (url) => await new Promise((resolve, reject) => {
		http.get(url, (res) => {
			let data = ''
			res.on('data', (part) => data += part)
			res.on('end', () => resolve(data))
			res.on('error', (err) => reject(err))
		})
	}),

	formatDate: (date) => `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth()}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`,

	toJSON: (data) => {
		const replacer = (k, v) => {
			if (v instanceof Set) {
				return {
					jsontype: 'set',
					val: [...v],
				}
			}

			return v
		}

		return JSON.stringify(data, replacer, '\t')
	},

	fromJSON: (data) => {
		const reviver = (k, v) => {
			switch (v.jsontype) {
				case 'set':
					return new Set(v.val)

				default:
					break
			}

			return v
		}

		return JSON.parse(data, reviver)
	},
}
