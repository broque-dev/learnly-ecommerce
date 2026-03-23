document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('.profile-img');

    // Añade una animación de hover a la imagen de perfil
    profileImg.addEventListener('mouseover', () => {
        profileImg.style.transform = 'scale(1.1)';
        profileImg.style.transition = 'transform 0.3s ease';
    });

    profileImg.addEventListener('mouseout', () => {
        profileImg.style.transform = 'scale(1)';
    });
});

//OBTENER PERFIL DEL USUARIO
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token'); // Supongo que estás guardando el token aquí

    if (!token) {
        alert("Debes iniciar sesión primero.");
        window.location.href = 'iniciar-sesion.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/perfil', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener el perfil del usuario.');
        }

        const userData = await response.json();

        // Rellenar el formulario con los datos del usuario
        document.getElementById('nombres').value = userData.nombre || '';
        document.getElementById('apellidos').value = userData.apellido || '';
        document.getElementById('direccion').value = userData.direccion || '';
        document.getElementById('correo').value = userData.correo || '';
        document.getElementById('telefono').value = userData.telefono || '';
        document.getElementById('biografia').value = userData.biografia || '';

        // Género
        if (userData.genero === 'masculino') {
            document.getElementById('masculino').checked = true;
        } else if (userData.genero === 'femenino') {
            document.getElementById('femenino').checked = true;
        }

        // Fecha de cumpleaños
        if (userData.fecha_nacimiento) {
            // Si la fecha tiene la forma '2020-01-18T00:00:00.000+00:00'
            const fechaNacimiento = new Date(userData.fecha_nacimiento);
            const fechaFormato = fechaNacimiento.toISOString().split('T')[0]; // '2020-01-18'
            document.getElementById('cumpleaños').value = fechaFormato;
        }

        // Intereses (checkboxes)
        const intereses = userData.intereses || [];
        intereses.forEach(interes => {
            const checkbox = document.getElementById(interes);
            if (checkbox) checkbox.checked = true;
        });

    } catch (error) {
        console.error(error);
        alert('Hubo un error al cargar tus datos. Por favor, intenta nuevamente.');
    }
});

//ACTUALIZAR PERFIL DEL USUARIO
document.querySelector('.btn-guardar').addEventListener('click', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Debes iniciar sesión primero.");
        return;
    }

    // Recoger los valores del formulario
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const biografia = document.getElementById('biografia').value.trim();
    const cumpleaños = document.getElementById('cumpleaños').value;

    // Obtener el género seleccionado
    const genero = document.querySelector('input[name="genero"]:checked')?.value;

    // Obtener los intereses seleccionados
    const intereses = Array.from(document.querySelectorAll('.opciones-interes input:checked')).map(input => input.id);

    // Preparar los datos para enviar
    const datosUsuario = {
        nombres,
        apellidos,
        direccion,
        correo,
        telefono,
        biografia,
        genero,
        cumpleaños,
        intereses
    };

    try {
        const response = await fetch('http://localhost:3000/actualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosUsuario)
        });

        if (response.ok) {
            const data = await response.json();
            alert('Perfil actualizado con éxito.');
            console.log('Usuario actualizado:', data);
        } else {
            const errorData = await response.json();
            alert(`Error al actualizar el perfil: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al actualizar el perfil. Intenta nuevamente.');
    }
});

