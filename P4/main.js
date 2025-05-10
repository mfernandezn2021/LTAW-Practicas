const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');

let win = null;
let serverProcess = null;

// Lanza el servidor de chat en segundo plano y reenvía stdout a la ventana
function startServer(win) {
  serverProcess = spawn('node', [path.join(__dirname, 'server.js')]);
  serverProcess.stdout.on('data', (data) => {
    const message = data.toString().trim();
    win.webContents.send('server-msg', message);
  });
  serverProcess.stderr.on('data', (data) => {
      win.webContents.send('server-msg', `<span style="color:red">${data.toString()}</span>`);
  });
}

app.on('ready', () => {
    win = new BrowserWindow({
        width: 800,
        height: 650,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
        title: "CHAT SERVER"
    });

    win.setMenuBarVisibility(false);
    win.loadFile('index.html');
    startServer(win);

    win.on('closed', () => {
        if (serverProcess) serverProcess.kill();
    });
});

// Devuelve info del sistema y la URL de conexión
ipcMain.handle('getInfo', async () => {
    const interfaces = os.networkInterfaces();
    let ip = 'localhost';
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                ip = iface.address;
                break;
            }
        }
    }
    return {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron,
        arch: process.arch,
        platform: process.platform,
        hostname: os.hostname(),
        chatURL: `http://${ip}:8000/public/`,
        users: 0 // Puedes actualizar esto si tienes endpoint para usuarios conectados
    };
});

// Botón de prueba: envía mensaje a todos los clientes conectados (puedes implementar la lógica real)
const http = require('http'); // Añade esto arriba si no lo tienes

ipcMain.handle('broadcastTest', async () => {
    return new Promise((resolve) => {
        const req = http.request({
            hostname: 'localhost',
            port: 8000,
            path: '/broadcast-test',
            method: 'POST'
        }, res => {
            res.on('data', () => {});
            res.on('end', () => resolve(true));
        });
        req.on('error', () => resolve(false));
        req.end();
    });
});