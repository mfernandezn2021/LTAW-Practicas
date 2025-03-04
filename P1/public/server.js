const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo necesitas

// Ruta al directorio public
const publicPath = '/home/cosmiccondor/Documentos/cuartoCurso/segundoCuatri/LTAW-Practicas/P1/public';

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(publicPath));

// Ruta principal (sirve el archivo index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Sirviendo archivos estáticos desde: ${publicPath}`);
});
