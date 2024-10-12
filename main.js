const { app, BrowserWindow, BaseWindow, dialog, ipcMain } = require('electron')
if(require('electron-squirrel-startup')) app.quit();
const path = require('node:path')
const { spawn } = require('child_process')
const fs = require('fs')
const admZip = require("adm-zip");

let elevatorServer = null;
const SERVER_PATH = './resources/elevation_server.exe'
const DEM_TILES_PATH = './resources/dem_tiles'

const createDemTiles = () => {
    if (fs.existsSync(DEM_TILES_PATH) && fs.existsSync(DEM_TILES_PATH + '.idx')) return true

    dialog.showMessageBoxSync({
        title: 'Необходима база данных высот над уровнем моря',
        message: "Укажите архив 'demTiles.zip'"
    })

    const arrayPath = dialog.showOpenDialogSync({
        filters: [
            { name: 'demTiles', extensions: ['zip'] }
        ],
        properties: ['openFile'],
    })
    if (!arrayPath || arrayPath[0].includes('demTiles.zip') === false) return false

    const zip = new admZip(arrayPath[0])
    zip.extractAllTo("./resources", true)

    return fs.existsSync(DEM_TILES_PATH) && fs.existsSync(DEM_TILES_PATH + '.idx');
}

const createServer = () => {
    elevatorServer = spawn(
        SERVER_PATH,
        [
            '-dem',
            DEM_TILES_PATH
        ],
        {
            env: {"ELECTRON_RUN_AS_NODE": "1"}
        }
    )

    elevatorServer.stdout.on("data",function(data){
        console.log("ElevatorServer Data: " + data)
    })

    elevatorServer.stderr.on("data",function(data){
        console.log("ElevatorServer Errors: " + data)
    })

    elevatorServer.on("exit",function(){
        console.log("ElevatorServer Script finished")
    })

    elevatorServer.stdin.end()
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.on('load-db', () => {
        if (!createDemTiles()) {
            dialog.showErrorBox('Нет базы данных высот', 'Приложение будет закрыто!')
            app.quit()
            return
        }
        if (!elevatorServer) createServer()
    })

    ipcMain.handle('wait-db-loaded', async () => {
        const checkLoaded = () => {
            if (elevatorServer === null) {
                setTimeout(checkLoaded, 1000)
            }
        }
        checkLoaded()
        return true
    })

    mainWindow.loadFile('./resources/index.html').then()
}

app.on('ready', () => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (elevatorServer) elevatorServer.kill('SIGINT')
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
