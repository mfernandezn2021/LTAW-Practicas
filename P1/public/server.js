const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const publicPath = path.join(__dirname);

app.use(express.static(publicPath));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Ruta para las páginas de productos
app.get('/producto/:id', (req, res) => {
    const productoId = req.params.id;
    const productoPath = path.join(publicPath, 'productos', `producto${productoId}.html`);
    
    // Verifica si el archivo del producto existe
    if (require('fs').existsSync(productoPath)) {
        res.sendFile(productoPath);
    } else {
        res.status(404).sendFile(path.join(publicPath, 'error.html'));
    }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).sendFile(path.join(publicPath, 'error.html'));
});

app.listen(PORT, '192.168.1.141',() => {
    console.log(`Servidor corriendo en http://192.168.1.141:${PORT}`);
});
