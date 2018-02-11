const { app, BrowserWindow } = require('electron')
const process = require('process')

const appPath = app.getAppPath()

let win

const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			webSecurity: false,
		},
	})
	win.on('closed', () => {
		win = null
	})

	win.loadURL(url)
}

let url = `file:///${appPath}/index.html`

app.on('ready', () => {
	if (process.env.ELECTRON_START_URL) {
		url = process.env.ELECTRON_START_URL

		const install = async () => {
			const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')
			const ext = [
				REACT_DEVELOPER_TOOLS,
				REDUX_DEVTOOLS,
			]

			for (let e of ext) {
				try {
					let name = await installExtension(e)
					console.log(`Added Extension: ${name}`)
				}
				catch (err) {
					console.error(`Failed to add extension: ${err}`)
				}
			}
		}
		install().catch(console.error)
	}

	createWindow()
})

if (process.platform !== 'darwin') {
	app.on('window-all-closed', app.quit)
}
else {
	app.on('activate', () => {
		if (!win) {
			createWindow()
		}
	})
}
