import { abrirSidebar, manejarCarrito } from "./carrito.js";

const url = "../js/data.json";

fetch(url)
    .then(res => res.json())
    .then(data => mostrarBombillas(data.bombillas))
    .catch(err => console.error("Error cargando JSON:", err));

let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.getElementById('totalMiniCarrito');
let subTotal = 0;

function validarStorage(storage) {
    if (storage) {
        return storage;
    } 
    return 0;
}

contadorElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'));
subTotalCarrito.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'));

const contenedorBombillas = document.querySelector('.contenedorBombillas');

function renderDescripcion(array) {
    let html = "";
    for (let index = 0; index < array.length; index++) {
        if (index === 0) {
            html += `<p class="fs-2 fw-normal ps-5">${array[index]}</p>`
        } else {
            html += `<p class="fs-4 fw-normal ps-5">${array[index]}</p>`
        }
    }
    return html
}

function mostrarBombillas(bombillas) {
    bombillas.forEach((bombilla) => {
        const divPadre = document.createElement('div');
        (bombilla.id % 2 === 0)
            ? divPadre.className = `bombilla w-100 d-flex flex-column align-items-start ps-5 py-5`
            : divPadre.className = `bombilla w-100 d-flex flex-column align-items-end pe-5 py-5`

        divPadre.innerHTML = `
            <div class="fila d-flex flex-row w-50" data-aos="fade-right">
                <div class="imagen w-50">
                    <a href="../pages/contacto.html">
                    <img src="${bombilla.imagen}" alt="${bombilla.nombre}">
                    </a>
                </div>
                <div class="parrafos d-flex flex-column ps-3">
                    <p class="fs-2 fw-bolder" id="itemName">${bombilla.nombre}</p>
                    ${renderDescripcion(bombilla.descripcion)}
                    <p class="fs-5 fw-normal ps-5 itemValue">$${bombilla.precio}</p>
                    <p class="fs-5 fw-normal ps-5">${bombilla.cuotas}</p>
                    <hr>
                    <div class="inputCantidadYagregar d-flex flex-row align-items-center">                
                        <label for="inputCantidad${bombilla.id}" class="visually-hidden">Cantidad</label>
                        <input name="cantidadParaAgregar" id="inputCantidad${bombilla.id}" class="inputCantidad" type="number" value="1" min="1">
                        <button class="button btn btn-dark btnComprar${bombilla.id}" data-id="${bombilla.id}" data-nombre="${bombilla.nombre}" data-precio="${bombilla.precio}" data-imagen="${bombilla.imagen}" data-categoria="${bombilla.categoria}">Agregar al
                        carrito</button>
                    </div>
                </div>
            </div>
        `;
        contenedorBombillas.appendChild(divPadre);

        const btnComprar = document.querySelector(`.btnComprar${bombilla.id}`);
        btnComprar.addEventListener('click', () => {
            const idBombilla = btnComprar.getAttribute('data-id');
            const nombreBombilla = btnComprar.getAttribute('data-nombre');
            const precioBombilla = btnComprar.getAttribute('data-precio');
            const imagenBombilla = btnComprar.getAttribute('data-imagen');
            const categoriaBombilla = btnComprar.getAttribute('data-categoria');

            let carrito;

            
            (localStorage.getItem('carrito') === null)
            ? carrito = []
            : carrito = JSON.parse(localStorage.getItem('carrito'));

            const inputCantidad = document.getElementById(`inputCantidad${bombilla.id}`);

            let nuevoProducto = {
                "id": idBombilla,
                "nombre": nombreBombilla,
                "precio": precioBombilla,
                "imagen": imagenBombilla,
                "categoria":categoriaBombilla
            }

            for (let i = 0; i < inputCantidad.value; i++) {
                carrito.push(nuevoProducto);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            let productosAlmacenados = Number(contadorElementosCarrito.textContent);
            (localStorage.getItem('subTotalProductos') === null)
            ? subTotal += parseInt(precioBombilla*inputCantidad.value)
            : subTotal = parseInt(precioBombilla*inputCantidad.value) + Number(localStorage.getItem('subTotalProductos'));
            productosAlmacenados+=Number(inputCantidad.value);
            localStorage.setItem('contadorProductos', Number(productosAlmacenados));
            localStorage.setItem('subTotalProductos', Number(subTotal));
            contadorElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
            subTotalCarrito.innerHTML = localStorage.getItem('subTotalProductos');

            swal(`¡ Se agregaron x${inputCantidad.value} ${nombreBombilla} al carrito!`,"", "success");

        });
    });
};

const botonSideBar = document.getElementById('sidebarButton');
botonSideBar.addEventListener('click', abrirSidebar);
botonSideBar.addEventListener('click', () => {
    subTotal = 0;
})

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');
botonVaciarCarrito.addEventListener('click', manejarCarrito)
botonVaciarCarrito.addEventListener('click', limpiarSubtotal);

function limpiarSubtotal() {
    subTotal = 0;
}
