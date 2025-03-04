const productos = [
    { id: 1, nombre: "Teclado mecánico", precio: 89.99, descripcion: "Teclado mecánico con retroiluminación RGB", imagen: "img/producto1.jpg" },
    { id: 2, nombre: "Mouse gaming", precio: 49.99, descripcion: "Mouse ergonómico para gaming con DPI ajustable", imagen: "img/producto2.jpg" },
    { id: 3, nombre: "Auriculares inalámbricos", precio: 129.99, descripcion: "Auriculares inalámbricos con cancelación de ruido", imagen: "img/producto3.jpg" }
];

const listaProductos = document.getElementById('lista-productos');
const modal = document.getElementById('modal');
const cerrarModal = document.getElementsByClassName('cerrar')[0];
const modalTitulo = document.getElementById('modal-titulo');
const modalImagen = document.getElementById('modal-imagen');
const modalDescripcion = document.getElementById('modal-descripcion');
const modalPrecio = document.getElementById('modal-precio');
const botonAñadirCarrito = document.getElementById('añadir-carrito');
const cantidadCarrito = document.getElementById('cantidad-carrito');

let carrito = [];

function mostrarProductos() {
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
        `;
        productoElement.addEventListener('click', () => abrirModal(producto));
        listaProductos.appendChild(productoElement);
    });
}

function abrirModal(producto) {
    modalTitulo.textContent = producto.nombre;
    modalImagen.src = producto.imagen;
    modalImagen.alt = producto.nombre;
    modalDescripcion.textContent = producto.descripcion;
    modalPrecio.textContent = `Precio: $${producto.precio}`;
    botonAñadirCarrito.onclick = () => añadirAlCarrito(producto);
    modal.style.display = 'block';
}

cerrarModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function añadirAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
    modal.style.display = 'none';
}

function actualizarCarrito() {
    cantidadCarrito.textContent = carrito.length;
}

mostrarProductos();
