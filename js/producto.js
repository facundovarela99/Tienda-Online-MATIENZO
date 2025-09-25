import { abrirSidebar, manejarCarrito } from "./carrito.js";
import validarStorage from "./main.js";

async function obtenerProductos() {
    const response = await fetch("../js/data.json");
    return response.json()
}

async function mostrarProductos() {
    try {
        const productos = await obtenerProductos();
        productos.forEach(producto => crearTarjetaProducto(producto));
    } catch (e) {
        console.error(e);
    }
}

let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.getElementById('totalMiniCarrito');
let subTotal = 0;

contadorElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'), 0);
subTotalCarrito.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0);

function renderDescripcion(array) {
    let html = "";
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            html += `<p class="fs-2 fw-bolder">${array[i]}</p>`
        } else {
            html += `<p class="fs-5 fw-normal">${array[i]}</p>`
        }
    }
    return html;
}

export function crearTarjetaProducto(producto) {
    const divPadre = document.createElement('div');
    (producto.id % 2 === 0)
        ? divPadre.className = `mate w-100 d-flex flex-column align-items-start ps-5 py-5`
        : divPadre.className = `mate w-100 d-flex flex-column align-items-end pe-5 py-5`;

    divPadre.innerHTML = `
        <div class="fila d-flex flex-row w-50" data-aos="fade-right">
          <div class="imagen w-50">
            <a href="../pages/contacto.html">
              <img src="${producto.imagen}" alt="${producto.nombre}">
            </a>
          </div>
          <div class="parrafos d-flex flex-column ps-3">
            <p class="fs-2 fw-bolder">${producto.nombre}</p>
            ${renderDescripcion(producto.descripcion)}
            <p class="fs-5 fw-normal">$ ${producto.precio},00</p>
            <p class="fs-5 fw-normal">${producto.cuotas}</p>
            <hr>
            <div class="inputCantidadYagregar d-flex flex-row align-items-center">
                <label for="inputCantidad${producto.id}" class="visually-hidden">Cantidad</label>
                <input name="cantidadParaAgregar" id="inputCantidad${producto.id}" class="inputCantidad" type="number" value="1" min="1">
                <button class="button btn btn-dark btnComprar${producto.id}" data-name="${producto.nombre}" data-id="${producto.id}" data-precio="${producto.precio}" data-img="${producto.imagen}" data-categoria="${producto.categoria}">Agregar al carrito</button>
            </div>
          </div>
        </div> 
    `

    const contenedorProducto = document.getElementById(`${producto.categoria}`);
    contenedorProducto.appendChild(divPadre);

    const botonComprar = divPadre.querySelector(`.btnComprar${producto.id}`);
    botonComprar.addEventListener('click', () => {
        const idProducto = botonComprar.getAttribute('data-id');
        const nombreProducto = botonComprar.getAttribute('data-name');
        const precioProducto = botonComprar.getAttribute('data-precio');
        const imagenProducto = botonComprar.getAttribute('data-img');
        const categoriaProducto = botonComprar.getAttribute('data-categoria');
        let carrito;

        if (localStorage.getItem('carrito') === null) {
            carrito = [];
        } else {
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }

        const inputCantidad = document.getElementById(`inputCantidad${producto.id}`);

        let product = {
            'id': idProducto,
            'nombre': nombreProducto,
            'precio': precioProducto,
            'imagen': imagenProducto,
            'categoria': categoriaProducto
        }
        for (let i = 0; i < inputCantidad.value; i++) {
            carrito.push(product);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        let productosAlmacenados = Number(contadorElementosCarrito.textContent);
        (localStorage.getItem('subTotalProductos') === null)
            ? subTotal += parseInt(precioProducto * inputCantidad.value)
            : subTotal = parseInt(precioProducto * inputCantidad.value) + Number(localStorage.getItem('subTotalProductos'));
        productosAlmacenados += Number(inputCantidad.value)
        localStorage.setItem('contadorProductos', Number(productosAlmacenados));
        localStorage.setItem('subTotalProductos', Number(subTotal));
        contadorElementosCarrito.innerHTML = productosAlmacenados;
        subTotalCarrito.innerHTML = subTotal;

        swal(`¡ Se agregaron x${inputCantidad.value} ${nombreProducto} al carrito!`, "", "success");
    })
}

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito'); //boton vaciar del nav-bar
botonVaciarCarrito.addEventListener('click', manejarCarrito); //implementa manejar carrito
botonVaciarCarrito.addEventListener('click', () => {
    subTotal = 0;
}); //limpia el acumulador subtotal

const sidebarButton = document.getElementById('sidebarButton');
sidebarButton.addEventListener('click', abrirSidebar); //implementa abrirSidebar con la lógica que implica (ver carrito.js)
sidebarButton.addEventListener('click', () => {
    subTotal = 0;
}); //limpia el acumulador subtotal

mostrarProductos();