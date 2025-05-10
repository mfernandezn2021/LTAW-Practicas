document.addEventListener('DOMContentLoaded', async function () {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('lista-carrito');
    const totalPedido = document.getElementById('total-pedido');
    let total = 0;

    // Leer el archivo JSON para obtener los productos
    const productos = await fetch('/public/tienda.json')
        .then(response => response.json())
        .then(data => data.Productos)
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            return [];
        });

    carrito.forEach(producto => {
        // Si el producto es un string, intenta parsearlo como objeto
        if (typeof producto === 'string') {
            try {
                producto = JSON.parse(producto);
            } catch {
                producto = { nombre: producto, precio: 0 };
            }
        }
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio ? producto.precio.toFixed(2) : '0.00'}`;
        listaCarrito.appendChild(li);

        total += producto.precio ? producto.precio : 0;
    });

    

    // Mostrar el total del pedido
    totalPedido.textContent = `Total: $${total.toFixed(2)}`;

    // Procesar el pedido al enviar el formulario
    const form = document.getElementById('procesar-pedido-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const direccion = document.getElementById('direccion').value;
        const tarjeta = document.getElementById('tarjeta').value;
    
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
            document.getElementById('pedido-mensaje').textContent = 'Pedido procesado con éxito';
            console.log('Pedido procesado:', data);
            alert('Pedido procesado con éxito');
            localStorage.removeItem('carrito');
            setTimeout(() => {
                window.location.href = '/index.html';
            }
            , 2000); // Redirigir después de 2 segundos
        })
        .catch(error => {
            console.error('Error al procesar el pedido:', error);
            alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.');
        });
    });
});