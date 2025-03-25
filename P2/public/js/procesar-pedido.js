document.addEventListener('DOMContentLoaded', async function () {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('lista-carrito');
    const totalPedido = document.getElementById('total-pedido');
    let total = 0;

    // Leer el archivo JSON para obtener los productos
    const productos = await fetch('/ruta/a/tu/tienda.json')
        .then(response => response.json())
        .then(data => data.Productos)
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            return [];
        });

    // Renderizar los productos del carrito con sus precios
    carrito.forEach(productoNombre => {
        const producto = productos.find(p => p.nombre === productoNombre);

        if (producto) {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
            listaCarrito.appendChild(li);

            total += producto.precio; // Sumar el precio al total
        } else {
            console.warn(`Producto no encontrado: ${productoNombre}`);
        }
    });

    // Mostrar el total del pedido
    totalPedido.textContent = `Total: $${total.toFixed(2)}`;

    // Procesar el pedido al enviar el formulario
    const form = document.getElementById('form-procesar-pedido');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const direccion = document.getElementById('direccion').value;
        const tarjeta = document.getElementById('tarjeta').value;

        // Enviar pedido al servidor
        fetch('/api/procesar-pedido', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                direccion,
                tarjeta,
                productos: carrito,
                total
            })
        })
            .then(response => response.json())
            .then(data => {
                alert('Pedido procesado con éxito');
                localStorage.removeItem('carrito'); // Vaciar el carrito
                window.location.href = '/gracias.html'; // Redirigir a la página de agradecimiento
            })
            .catch(error => {
                console.error('Error al procesar el pedido:', error);
                alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
            });
    });
});