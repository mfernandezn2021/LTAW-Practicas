document.addEventListener('DOMContentLoaded', function() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalPedido = document.getElementById('total-pedido');
    const form = document.getElementById('procesar-pedido-form');

    // Comprobar si el usuario está logueado
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (!usuarioActual) {
        window.location.href = '/login.html';
        return;
    }

    // Mostrar productos en el carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = producto;
        listaCarrito.appendChild(li);
        // Aquí deberías obtener el precio real del producto desde la base de datos
        total += 100; // Precio ficticio para este ejemplo
    });
    totalPedido.textContent = `$${total.toFixed(2)}`;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const direccion = document.getElementById('direccion').value;
        const tarjeta = document.getElementById('tarjeta').value;

        // Enviar pedido al servidor
        fetch('/api/procesar-pedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario: usuarioActual,
                direccion,
                tarjeta,
                productos: carrito,
                total
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Pedido procesado con éxito');
                localStorage.removeItem('carrito');
                window.location.href = '/';
            } else {
                alert('Error al procesar el pedido');
            }
        });
    });
});
