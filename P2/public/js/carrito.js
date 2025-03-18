document.addEventListener('DOMContentLoaded', function() {
    const contenidoCarrito = document.getElementById('contenido-carrito');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');

    // Comprobar si el usuario está logueado
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (!usuarioActual) {
        contenidoCarrito.innerHTML = '<p>Debes iniciar sesión para ver tu carrito</p>';
        finalizarCompraBtn.style.display = 'none';
        return;
    }

    // Mostrar productos en el carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = '<p>Tu carrito está vacío</p>';
        finalizarCompraBtn.style.display = 'none';
    } else {
        const listaProductos = document.createElement('ul');
        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = producto;
            listaProductos.appendChild(li);
        });
        contenidoCarrito.appendChild(listaProductos);
    }

    finalizarCompraBtn.addEventListener('click', function() {
        window.location.href = '/procesar-pedido.html';
    });
});
