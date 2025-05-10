const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const PORT = 8001;
const publicPath = path.join(__dirname, 'public');

// MIME types mapping
const MIME_TYPES = {
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'application/javascript',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.ico': 'image/x-icon'
};

// Create HTTP server
const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url);
	let pathname = `.${parsedUrl.pathname}`;
	const ext = path.extname(pathname);

	// Endpoint para procesar pedidos
	if (req.method === 'POST' && parsedUrl.pathname === '/api/procesar-pedido') {
		let body = '';
		req.on('data', chunk => { body += chunk; });
		req.on('end', () => {
			const pedido = JSON.parse(body);
			fs.readFile(path.join(publicPath, 'tienda.json'), (err, data) => {
				if (err) {
					res.statusCode = 500;
					res.end(JSON.stringify({ error: 'Error leyendo la base de datos' }));
					return;
				}
				let json = JSON.parse(data);
				if (!json.Pedidos) json.Pedidos = [];

				// Descontar stock de cada producto comprado
				pedido.productos.forEach(pedidoProd => {
					const prod = json.Productos.find(p => p.nombre === pedidoProd.nombre);
					if (prod && prod.stock > 0) {
						prod.stock -= 1;
						if (prod.stock < 0) {
							prod.stock = 0;
							console.log(`Stock insuficiente para ${pedidoProd.nombre}`);
							alert(`Stock insuficiente para ${pedidoProd.nombre}`);
						}
					}
				});

				json.Pedidos.push({
					direccion: pedido.direccion,
					tarjeta: pedido.tarjeta,
					productos: pedido.productos,
					total: pedido.total,
					fecha: new Date().toISOString()
				});
				fs.writeFile(path.join(publicPath, 'tienda.json'), JSON.stringify(json, null, 2), err2 => {
					if (err2) {
						res.statusCode = 500;
						res.end(JSON.stringify({ error: 'Error guardando el pedido' }));
						return;
					}
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({ ok: true }));
				});
			});
		});
		return;
	}

  // Set MIME type if known
  if (MIME_TYPES[ext]) {
		res.setHeader('Content-Type', MIME_TYPES[ext]);
	}

	// Handle root path
	if (pathname === './') {
		pathname = path.join(publicPath, 'index.html');
	} else if (pathname.startsWith('./producto')) {
		// Handle product pages
		const productId = pathname.match(/producto(\d+)\.html/);
		if (productId) {
			pathname = path.join(publicPath, `producto${productId[1]}.html`);
		}
	} else {
		// Serve static files
		pathname = path.join(publicPath, pathname);
	}

	// Check if file exists and serve it
	fs.exists(pathname, (exist) => {
		if (!exist) {
			res.statusCode = 404;
			pathname = path.join(publicPath, 'error.html');
		}

		fs.readFile(pathname, (err, data) => {
			if (err) {
				res.statusCode = 500;
				res.end(`Error getting the file: ${err}.`);
			} else {
				res.end(data);
			}
		});
	});
});

// Start the server
server.listen(PORT, 'localhost', () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});