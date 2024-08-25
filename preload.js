const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setRequest: (coordinates) => ipcRenderer.send('set-request', coordinates),
    getResponse: () => ipcRenderer.invoke('get-response').then(height => height)
})
