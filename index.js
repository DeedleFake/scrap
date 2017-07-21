const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function initWin()
{
	win = new BrowserWindow({
		width: 600,
		height: 500,
	})
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true,
	}))
	win.on('closed', () => {win = null})
}

app.on('ready', initWin)
