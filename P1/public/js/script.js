const productos = [
    { id: 1, nombre: "Teclado mecánico", precio: 89.99, descripcion: "Teclado mecánico con retroiluminación RGB" },
    { id: 2, nombre: "Mouse gaming", precio: 49.99, descripcion: "Mouse ergonómico para gaming con DPI ajustable" },
    { id: 3, nombre: "Auriculares inalámbricos", precio: 129.99, descripcion: "Auriculares inalámbricos con cancelación de ruido" }
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
            <a href="/producto/${producto.id}">Ver detalles</a>
        `;
        listaProductos.appendChild(productoElement);
    });
}

mostrarProductos();
