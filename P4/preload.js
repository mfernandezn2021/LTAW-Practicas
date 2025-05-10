const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getInfo: () => ipcRenderer.invoke('getInfo'),
    broadcastTest: () => ipcRenderer.invoke('broadcastTest'),
    onServerMsg: (callback) => ipcRenderer.on('server-msg', callback),
    onUsersCount: (callback) => ipcRenderer.on('users-count', (_, count) => callback(count)),

});