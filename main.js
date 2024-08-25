const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { spawn } = require('child_process')

let elevatorServer;

const createWindow = () => {

    elevatorServer = spawn('powershell.exe', )

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('./public/index.html').then()
};

app.on('ready', () => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
