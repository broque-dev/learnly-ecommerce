/* Selecciona el campo de búsqueda y todas las tarjetas de curso
const searchBar = document.getElementById('searchBar');
const courseCards = document.querySelectorAll('.course-card');

// Escucha el evento de entrada en el campo de búsqueda
searchBar.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();

  courseCards.forEach(card => {
    // Busca el nombre del curso desde data-course-name
    const courseName = card.getAttribute('data-course-name').toLowerCase();

    // Filtra en base al nombre
    if (courseName.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});*/



document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("Realizando solicitud a la API...");

        // Solicitar datos de la API
        const response = await fetch('http://localhost:3001/api/curso/listar');

        // Verificar que la respuesta sea correcta
        if (!response.ok) {
            throw new Error('Error al obtener los cursos: ' + response.statusText);
        }

        const cursos = await response.json();
        console.log("Datos recibidos de la API:", cursos);

        // Obtener el contenedor principal
        const contentContainer = document.getElementById("content");

        if (!contentContainer) {
            console.error("El contenedor con id 'content' no se encontró.");
            return;
        }

        // Limpiar el contenedor por seguridad
        contentContainer.innerHTML = "";

        // Verificar si hay cursos disponibles
        if (Array.isArray(cursos) && cursos.length > 0) {
            console.log("Hay cursos disponibles. Procesando...");

            // Recorrer los cursos y generar tarjetas dinámicas
            cursos.forEach(curso => {
                console.log("Procesando curso:", curso);

                // Validar que el curso tenga los datos necesarios
                if (!curso.titulo || !curso.imagenUrl || !curso.categoria || !curso.instructor) {
                    console.warn("Datos incompletos para este curso. Saltando:", curso);
                    return;
                }

                // Extraer datos
                const { titulo, imagenUrl, categoria, instructor } = curso;
                const tipoCurso = categoria === "FREE" ? "GRATIS" : "PREMIUM";

                // Procesar la URL de la imagen
                const urlParts = imagenUrl.split('/');  // Dividimos la URL por '/'
                const imagenNombre = urlParts[urlParts.length - 1].split('.')[0]; // Extraemos el nombre antes de .jpg
                const categoriaNombre = urlParts[urlParts.length - 2].split('.')[0]; // Extraemos la parte antes de .com

                // Generar la nueva ruta de la imagen
                const nuevaRutaImagen = `/public/img/ninos/${imagenNombre}_${categoriaNombre}.jpg`;

                // Crear una tarjeta
                const cursoCard = document.createElement("a");
                cursoCard.href = `apartado_${imagenNombre}.html`; // Generamos el href dinámicamente
                cursoCard.classList.add("course-card");

                // Contenido dinámico de la tarjeta
                cursoCard.innerHTML = `
                    <div class="image-container">
                        <img src="${nuevaRutaImagen}" alt="${titulo}" class="course-image">
                    </div>
                    <div class="content-container">
                        <h1><i class="icon-class">🐍</i> ${titulo}</h1>
                        <div class="instructors-list">
                            <div class="instructor-item">
                                <img src="/public/img/ninos/profe.png" alt="Instructor ${instructor.nombre}" class="instructor-image">
                                <div class="instructor-info">
                                    <h3 class="instructor-name">${instructor.nombre}</h3>
                                </div>
                                <div class="premium-gratis">
                                    ${tipoCurso}
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Añadir la tarjeta al contenedor principal
                contentContainer.appendChild(cursoCard);
            });

        } else {
            console.log("No hay cursos disponibles en la respuesta de la API.");
        }

    } catch (error) {
        console.error("Error al cargar los cursos:", error);
    }
});

  
  


