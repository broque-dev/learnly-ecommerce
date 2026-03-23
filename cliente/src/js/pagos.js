document.addEventListener('DOMContentLoaded', () => {
    const itemsCarrito = [
        { nombre: 'Curso de HTML Kids', precio: 49.99 },
        { nombre: 'Curso de Python Kids', precio: 89.99 }
    ];

    const itemsResumen = document.getElementById('items-resumen');
    const totalResumen = document.getElementById('total-resumen');
    let total = 0;

    // Mostrar productos en el resumen de compra
    itemsCarrito.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-resumen');
        itemDiv.innerHTML = `
            <p>${item.nombre}</p>
            <p>Precio: S/${item.precio.toFixed(2)}</p>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        itemsResumen.appendChild(itemDiv);
        total += item.precio;
    });

    // Actualizar total
    totalResumen.textContent = `Total: S/${total.toFixed(2)}`;
    const pagarBtn = document.getElementById('pagar-btn');
    pagarBtn.innerHTML = `Pagar S/ ${total.toFixed(2)} PEN`;

    // Función para eliminar un item
    document.querySelectorAll('.btn-eliminar').forEach(boton => {
        boton.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            itemsCarrito.splice(index, 1); // Eliminar del carrito

            // Limpiar resumen y volver a llenarlo
            itemsResumen.innerHTML = '';
            total = 0;

            itemsCarrito.forEach((item, idx) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item-resumen');
                itemDiv.innerHTML = `
                    <p>${item.nombre}</p>
                    <p>Precio: S/${item.precio.toFixed(2)}</p>
                    <button class="btn-eliminar" data-index="${idx}">Eliminar</button>
                `;
                itemsResumen.appendChild(itemDiv);
                total += item.precio;
            });

            totalResumen.textContent = `Total: S/${total.toFixed(2)}`;
            pagarBtn.innerHTML = `Pagar S/ ${total.toFixed(2)} PEN`;

            // Volver a añadir eventos de eliminación
            document.querySelectorAll('.btn-eliminar').forEach(boton => {
                boton.addEventListener('click', function () {
                    const index = parseInt(this.getAttribute('data-index'));
                    itemsCarrito.splice(index, 1);
                    itemsResumen.innerHTML = '';
                    total = 0;

                    itemsCarrito.forEach((item, idx) => {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('item-resumen');
                        itemDiv.innerHTML = `
                            <p>${item.nombre}</p>
                            <p>Precio: S/${item.precio.toFixed(2)}</p>
                            <button class="btn-eliminar" data-index="${idx}">Eliminar</button>
                        `;
                        itemsResumen.appendChild(itemDiv);
                        total += item.precio;
                    });

                    totalResumen.textContent = `Total: S/${total.toFixed(2)}`;
                    pagarBtn.innerHTML = `Pagar S/ ${total.toFixed(2)} PEN`;
                });
            });
        });
    });
});

// Función para cambiar el formulario de pago según el método seleccionado
function cambiarMetodoPago() {
    const metodoPago = document.getElementById('metodo-pago').value;
    const formTarjeta = document.getElementById('form-tarjeta');
    const formEfectivo = document.getElementById('form-efectivo');
    const formBilletera = document.getElementById('form-billetera');

    // Ocultar todos los formularios
    formTarjeta.style.display = 'none';
    formEfectivo.style.display = 'none';
    formBilletera.style.display = 'none';

    // Mostrar el formulario correspondiente
    if (metodoPago === 'tarjeta') {
        formTarjeta.style.display = 'block';
    } else if (metodoPago === 'efectivo') {
        formEfectivo.style.display = 'block';
    } else if (metodoPago === 'billetera') {
        formBilletera.style.display = 'block';
    }
}

// Función para actualizar el botón de pago según las cuotas
function actualizarBoton() {
    const cuotas = document.getElementById('cuotas');
    const pagarBtn = document.getElementById('pagar-btn');
    const total = parseFloat(document.getElementById('total-resumen').textContent.replace('Total: S/', ''));

    if (cuotas.value == "4") {
        pagarBtn.innerHTML = `Pagar 4 Cuotas de S/ ${(total / 4).toFixed(2)} PEN`;
    } else {
        pagarBtn.innerHTML = `Pagar S/ ${total.toFixed(2)} PEN`;
    }
}