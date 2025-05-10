let productosCache = [];

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
			productosCache = productos; // Guardamos los productos en el cache
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
		}
	);

	function logout() {
    localStorage.removeItem('usuarioActual');
		localStorage.removeItem('carrito');
    window.location.reload();
	}

	const inputBusqueda = document.getElementById('busqueda-producto');
	const sugerenciasDiv = document.getElementById('sugerencias');
	const buscarBtn = document.getElementById('buscar-btn');

	inputBusqueda.addEventListener('input', function() {
		const texto = inputBusqueda.value.trim().toLowerCase();
		sugerenciasDiv.innerHTML = '';
		if (texto.length >= 1 && productosCache.length > 0) {
			// Solo productos cuyo nombre EMPIEZA por el texto introducido
			const sugerencias = productosCache.filter(p => p.nombre.toLowerCase().includes(texto));
			if (sugerencias.length > 0) {
				const lista = document.createElement('ul');
				lista.style.position = 'absolute';
				lista.style.background = '#000';
				lista.style.border = '1px solid #ccc';
				lista.style.width = inputBusqueda.offsetWidth + 'px';
				lista.style.zIndex = 1000;
				lista.style.listStyle = 'none';
				lista.style.padding = '0';
				lista.style.margin = '0';
				sugerencias.forEach(prod => {
					const li = document.createElement('li');
					li.textContent = prod.nombre;
					li.style.padding = '5px 10px';
					li.style.cursor = 'pointer';
					li.addEventListener('mousedown', () => {
						inputBusqueda.value = prod.nombre;
						sugerenciasDiv.innerHTML = '';
					});
					lista.appendChild(li);
				});
				sugerenciasDiv.appendChild(lista);
			}
		}
	});

	buscarBtn.addEventListener('click', function() {
    const texto = inputBusqueda.value.trim().toLowerCase();
    const prod = productosCache.find(p => p.nombre.toLowerCase() === texto);
    if (prod) {
        window.location.href = `producto${productosCache.indexOf(prod)+1}.html`;
    } else {
        alert('Producto no encontrado');
    }
	});
});

function agregarAlCarrito(nombreProducto) {
	if (!localStorage.getItem('usuarioActual')) {
			alert('Debes iniciar sesión para añadir productos al carrito');
			return;
	}
	// Busca el producto en productosCache
	const producto = productosCache.find(p => p.nombre === nombreProducto);
	if (!producto) {
			alert('Producto no encontrado');
			return;
	}
	let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	carrito.push(producto);
	localStorage.setItem('carrito', JSON.stringify(carrito));
	alert('Producto añadido al carrito');
}



