const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const PORT = 8001;
const publicPath = path.join(__dirname, 'public');

// MIME types mapping
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;
    const ext = path.extname(pathname);

    // Set MIME type if known
    if (MIME_TYPES[ext]) {
        res.setHeader('Content-Type', MIME_TYPES[ext]);
    }

    // Handle root path
    if (pathname === './') {
        pathname = path.join(publicPath, 'index.html');
    } else if (pathname.startsWith('./producto')) {
        // Handle product pages
        const productId = pathname.match(/producto(\d+)\.html/);
        if (productId) {
            pathname = path.join(publicPath, `producto${productId[1]}.html`);
        }
    } else {
        // Serve static files
        pathname = path.join(publicPath, pathname);
    }

    // Check if file exists and serve it
    fs.exists(pathname, (exist) => {
        if (!exist) {
            res.statusCode = 404;
            pathname = path.join(publicPath, 'error.html');
        }

        fs.readFile(pathname, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {
                res.end(data);
            }
        });
    });
});

// Start the server
server.listen(PORT, 'localhost', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});