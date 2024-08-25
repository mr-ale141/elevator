const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setRequest: (lat, lang) => ipcRenderer.send('set-request', { lat, lang }),
    getResponse: () => ipcRenderer.invoke('get-response').then(height => height)
})
