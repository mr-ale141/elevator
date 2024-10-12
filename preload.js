const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    loadDataBase: () => ipcRenderer.send('load-db'),
    waitLoaded: async () => ipcRenderer.invoke('wait-db-loaded')
})
