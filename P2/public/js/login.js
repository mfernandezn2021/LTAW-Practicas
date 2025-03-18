document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    
    // Simulamos una verificación del lado del servidor
    fetch('/tienda.json')
        .then(response => response.json())
        .then(data => {
            const usuario = data.Usuarios.find(u => u.nombre === nombre);
            if (usuario) {
                localStorage.setItem('usuarioActual', nombre);
                document.getElementById('login-message').textContent = `Login exitoso. Bienvenido, ${usuario.nombreReal}. Redirigiendo...`;
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 1500);
            } else {
                document.getElementById('login-message').textContent = 'Usuario no encontrado';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('login-message').textContent = 'Error al iniciar sesión';
        });
});
