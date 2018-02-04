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
}
