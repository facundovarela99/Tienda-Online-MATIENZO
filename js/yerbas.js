import { abrirSidebar, manejarCarrito } from "./carrito.js";

const url = "../js/data.json";

fetch(url)
    .then(res => res.json())
    .then(data => mostrarYerbas(data.yerbas))
    .catch(err => console.error("Error cargando JSON:", err));


let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.getElementById('totalMiniCarrito');
let subTotal = 0;


if (localStorage.getItem('contadorProductos') === null) {
    contadorElementosCarrito.innerHTML = 0;
} else {
    contadorElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
}


if (localStorage.getItem('subTotalProductos') === null) {
    subTotalCarrito.innerHTML = 0;
} else {
    subTotalCarrito.innerHTML = localStorage.getItem('subTotalProductos');
}

const contenedorYerbas = document.querySelector('.containerYerbas');

function renderDescripcion(array) {
    let html = ""
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            html += `<p class="fs-2 fw-bolder">${array[i]}</p>`;
        } else {
            html += `<p class="fs-5 fw-normal ps-5">${array[i]}</p>`;
        }
    }
    return html;
}

function mostrarYerbas(yerbas) {
    yerbas.forEach(yerba => {
        const divPadre = document.createElement('div');
        (yerba.id % 2 === 0)
        ?divPadre.className = 'yerba w-100 d-flex flex-column align-items-start ps-5 py-5'
        :divPadre.className = 'yerba w-100 d-flex flex-column align-items-end pe-5 py-5'
        divPadre.innerHTML = `
        <div class="fila d-flex flex-row w-50" data-aos="fade-right">
          <div class="imagen w-50">
            <a href="../pages/contacto.html">
              <img src="${yerba.imagen}" alt="${yerba.nombre}">
            </a>
          </div>
          <div class="parrafos d-flex flex-column ps-3">
            <p class="fs-2 fw-bolder">${yerba.nombre}</p>
            ${renderDescripcion(yerba.descripcion)}
            <p class="fs-5 fw-normal ps-5">$ ${yerba.precio}.00</p>
            <hr>
            <div class="inputCantidadYagregar d-flex flex-row align-items-center">
                <label for="inputCantidad${yerba.id}" class="visually-hidden">Cantidad</label>
                <input name="cantidadParaAgregar" id="inputCantidad${yerba.id}" class="inputCantidad" type="number" value="1" min="1">
                <button class="button btnComprar${yerba.id} btn btn-dark buttonAddToCart" data-name="${yerba.nombre}" data-id="${yerba.id}" data-precio="${yerba.precio}" data-img="${yerba.imagen}" data-categoria="${yerba.categoria}">Agregar al carrito</button>
            </div>
          </div>
        </div>
        `
        contenedorYerbas.appendChild(divPadre);

        const botonComprar = document.querySelector(`.btnComprar${yerba.id}`);
        botonComprar.addEventListener('click', () => {
            const nombreYerba = botonComprar.getAttribute('data-name');
            const idYerba = botonComprar.getAttribute('data-id');
            const precioYerba = botonComprar.getAttribute('data-precio');
            const imagenYerba = botonComprar.getAttribute('data-img');
            const categoriaYerba = botonComprar.getAttribute('data-categoria');

            let carrito;

            if (localStorage.getItem('carrito') === null) {
                carrito = [];
            } else {
                carrito = JSON.parse(localStorage.getItem('carrito'));
            }

            const inputCantidad = document.getElementById(`inputCantidad${yerba.id}`);

            let nuevoProducto = {
                'id': idYerba,
                'nombre': nombreYerba,
                'precio': precioYerba,
                'imagen': imagenYerba,
                'categoria':categoriaYerba
            };

            for (let i = 0; i < inputCantidad.value; i++) {
                carrito.push(nuevoProducto);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            let productosAlmacenados = Number(contadorElementosCarrito.textContent);
            (localStorage.getItem('subTotalProductos') === null)
            ? subTotal += parseInt(precioYerba*inputCantidad.value)
            : subTotal = parseInt(precioYerba*inputCantidad.value)+Number(localStorage.getItem('subTotalProductos'))
            productosAlmacenados+=Number(inputCantidad.value);
            localStorage.setItem('contadorProductos', Number(productosAlmacenados));
            localStorage.setItem('subTotalProductos', Number(subTotal));
            contadorElementosCarrito.innerHTML = productosAlmacenados;
            subTotalCarrito.innerHTML = subTotal;

            swal(`¡ Se agregaron x${inputCantidad.value} ${nombreYerba} al carrito!`,"", "success");
        });
    });
};

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');
botonVaciarCarrito.addEventListener('click', manejarCarrito);
botonVaciarCarrito.addEventListener('click', limpiarSubtotal);

function limpiarSubtotal(){
    subTotal=0;
}

const botonSideBar = document.getElementById('sidebarButton');
botonSideBar.addEventListener('click', abrirSidebar);
botonSideBar.addEventListener('click',()=>{
    subTotal=0;
})