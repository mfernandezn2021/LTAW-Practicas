const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo necesitas

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal (sirve el archivo index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
