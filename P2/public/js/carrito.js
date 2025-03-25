document.addEventListener('DOMContentLoaded', function () {
    const contenidoCarrito = document.getElementById('contenido-carrito');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    const agregarProductoForm = document.getElementById('agregarProductoForm');
    const inputProducto = document.getElementById('producto-input');

    // Comprobar si el usuario está logueado
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (!usuarioActual) {
        contenidoCarrito.innerHTML = '<p>Debes iniciar sesión para ver tu carrito</p>';
        finalizarCompraBtn.style.display = 'none';
        return;
    }

    // Mostrar productos en el carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    renderizarCarrito();

    // Evento para finalizar compra
    finalizarCompraBtn.addEventListener('click', function () {
        window.location.href = '/procesar-pedido.html';
    });

    // Función para renderizar el carrito
    function renderizarCarrito() {
        contenidoCarrito.innerHTML = ''; // Limpiar contenido previo
        if (carrito.length === 0) {
            contenidoCarrito.innerHTML = '<p>Tu carrito está vacío</p>';
            finalizarCompraBtn.style.display = 'none';
            return;
        }

        finalizarCompraBtn.style.display = 'block';
        const listaProductos = document.createElement('ul');
        listaProductos.classList.add('lista-productos');

        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.textContent = producto;
            li.classList.add('producto-item');

            // Botón para eliminar producto
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.classList.add('eliminar-btn');
            eliminarBtn.addEventListener('click', function () {
                eliminarProducto(index, li);
            });

            li.appendChild(eliminarBtn);
            listaProductos.appendChild(li);
        });

        contenidoCarrito.appendChild(listaProductos);
    }

    // Función para eliminar un producto con animación
    function eliminarProducto(index, elemento) {
        elemento.classList.add('eliminando'); // Añadir clase para animación
        setTimeout(() => {
            carrito.splice(index, 1); // Eliminar producto del array
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar localStorage
            renderizarCarrito(); // Volver a renderizar el carrito
        }, 500); // Tiempo de la animación
    }
});