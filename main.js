const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { spawn } = require('child_process')

let elevatorServer;

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

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('./public/index.html').then()
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
