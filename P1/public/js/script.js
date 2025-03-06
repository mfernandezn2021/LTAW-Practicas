const productos = [
    { id: 1, nombre: "RAZER BLACKWIDOW V4 PRO 75%", precio: 349.99, descripcion: "Conexión inalámbrica a 4000 Hz reales y Bluetooth 5.1. Razer" },
    { id: 2, nombre: "Logitech PRO X SUPERLIGHT 2", precio: 139.99, descripcion: "Mouse ultra ligero para gaming con DPI ajustable. Logitech" },
    { id: 3, nombre: "Corsair VOID RGB ELITE Wireless", precio: 119.99, descripcion: "Auriculares inalámbricos premium para juegos Corsair" },
];

const listaProductos = document.getElementById('lista-productos');

function mostrarProductos() {
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <img src="/img/producto${producto.id}.jpg" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <a href="/producto${producto.id}.html">Ver detalles</a>
        `;
        listaProductos.appendChild(productoElement);
    });
}

mostrarProductos();
