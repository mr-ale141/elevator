const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { spawn } = require('child_process')

let elevatorServer = null;
let response = null;

const createServer = () => {
    elevatorServer = spawn('powershell.exe', [path.join(__dirname, 'server/start_server.ps1')])

    elevatorServer.stdout.on("data",function(data){
        console.log("Powershell Data: " + data);
    });

    elevatorServer.stderr.on("data",function(data){
        console.log("Powershell Errors: " + data);
    });

    elevatorServer.on("exit",function(){
        console.log("Powershell Script finished");
    });

    elevatorServer.stdin.end();
}

const createWindow = () => {

    createServer();

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on('set-request', (event, coordinates) => {
        const request = spawn('powershell.exe', [path.join(__dirname, 'server/start_server.ps1')])
    })

    ipcMain.handle('get-response', async () => {
        return response
    })

    mainWindow.loadFile('./public/index.html').then()
}

app.on('ready', () => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {

    elevatorServer.emit('close');

    if (process.platform !== 'darwin') {
        app.quit()
    }
})
