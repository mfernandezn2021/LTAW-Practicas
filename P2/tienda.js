const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 2000;

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

// Middleware para manejar tipos MIME
app.use((req, res, next) => {
    const ext = path.extname(req.url);
    if (MIME_TYPES[ext]) {
        res.type(MIME_TYPES[ext]);
    }
    next();
});

// Configuración de rutas estáticas
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use(express.static(publicPath));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
    console.log(`Ruta principal servida`);
});

// Ruta para las páginas de productos
app.get('/producto:id.html', (req, res) => {
    const productoFileName = `producto${req.params.id}.html`;
    const productoPath = path.join(publicPath, productoFileName);
    console.log(`Solicitud para producto: ${productoFileName}`);
    
    // Verifica si el archivo del producto existe
    if (fs.existsSync(productoPath)) {
        res.sendFile(productoPath);
        console.log(`Producto servido: ${productoFileName}`);
    } else {
        res.status(404).sendFile(path.join(publicPath, 'error.html'));
        console.log(`Producto no encontrado: ${productoFileName}`);
    }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).sendFile(path.join(publicPath, 'error.html'));
    console.log(`Ruta no encontrada: ${req.url}`);
});

app.listen(PORT, 'localhost', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
