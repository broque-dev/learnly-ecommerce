document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const correo = document.querySelector('[name="correo"]').value.trim();
    const contra = document.querySelector('[name="contra"]').value.trim();

    // Validación de campos vacíos
    if (!correo || !contra) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/iniciar-sesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, contra })
        });

        if (!response.ok) {
            // Manejo de errores del servidor (status 401, 500, etc.)
            const errorData = await response.json();
            alert(errorData.mensaje || 'Error al iniciar sesión.');
            return;
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data); // Verificar los datos devueltos

        if (data.exito) {
            // Guardar datos importantes en localStorage
            localStorage.setItem('userName', data.nombre);  // Primer nombre del usuario
            localStorage.setItem('cssType', data.css);      // Tipo de CSS
            localStorage.setItem('token', data.token);      // Token para autenticación

            // Redirigir a la página principal
            window.location.href = 'inicio.html';
        } else {
            alert(data.mensaje); // Mensaje personalizado del servidor
        }
    } catch (error) {
        console.error('Error en la conexión:', error);
        alert('Hubo un problema con la conexión al servidor.');
    }
});
