fetch('/api/productos')
    .then(response => response.json())
    .then(productos => {
        const listaProductos = document.getElementById('lista-productos');
        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.innerHTML = `
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <button onclick="window.location.href='/producto.html?id=${producto.id}'">Ver Producto</button>
            `;
            listaProductos.appendChild(productoDiv);
        });
    });