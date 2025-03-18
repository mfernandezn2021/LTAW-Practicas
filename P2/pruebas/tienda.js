const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 8001;
const publicPath = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        serveFile(res, path.join(publicPath, 'index.html'), 'text/html');
    } else if (pathname === '/api/productos') {
        handleProductosApi(res);
    } else if (pathname === '/api/login' && req.method === 'POST') {
        handleLoginApi(req, res);
    } else {
        serveFile(res, path.join(publicPath, pathname), getMimeType(pathname));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

function getMimeType(url) {
    if (url.endsWith('.html')) return 'text/html';
    if (url.endsWith('.js')) return 'application/javascript';
    if (url.endsWith('.css')) return 'text/css';
    if (url.endsWith('.json')) return 'application/json';
    if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'image/jpeg';
    if (url.endsWith('.png')) return 'image/png';
    return 'text/plain';
}

function handleProductosApi(res) {
    fs.readFile('tienda.json', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error al leer la base de datos' }));
            return;
        }
        const tienda = JSON.parse(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tienda.productos));
    });
}

function handleLoginApi(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const { nombre } = JSON.parse(body);
        fs.readFile('tienda.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error al leer la base de datos' }));
                return;
            }
            const tienda = JSON.parse(data);
            const usuario = tienda.usuarios.find(u => u.nombre === nombre);
            if (usuario) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, nombreReal: usuario.nombreReal }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false }));
            }
        });
    });
}