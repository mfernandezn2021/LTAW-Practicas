document.addEventListener('DOMContentLoaded', function() {
    const listaProductos = document.getElementById('lista-productos');
    const loginButton = document.getElementById('loginButton');

    // Comprobar si el usuario está logueado
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
        loginButton.textContent = `Conectado como ${usuarioActual}`;
        loginButton.href = '#';
        loginButton.onclick = logout;
    }

    // Cargar productos desde tienda.json
    fetch('/tienda.json')
        .then(response => response.json())
        .then(data => {
            const productos = data.Productos; // Accedemos a la sección de productos del JSON
            productos.forEach((producto, index) => {
                const productoElement = document.createElement('div');
                productoElement.className = 'producto';
                productoElement.innerHTML = `
                    <img src="/img/producto${index + 1}.jpg" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <button class="volver-btn" onclick="agregarAlCarrito('${producto.nombre}')">Añadir al carrito</button>
                `;
                listaProductos.appendChild(productoElement);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});

function agregarAlCarrito(nombreProducto) {
    if (!localStorage.getItem('usuarioActual')) {
        alert('Debes iniciar sesión para añadir productos al carrito');
        return;
    }
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(nombreProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto añadido al carrito');
}

function logout() {
    localStorage.removeItem('usuarioActual');
    window.location.reload();
}
