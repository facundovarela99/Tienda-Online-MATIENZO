import { abrirSidebar, manejarCarrito } from "../Logica carrito/carrito.js";
import { comprar } from "./compra.js";

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
        ? divPadre.className = `${producto.tipo} w-100 d-flex flex-column align-items-start ps-5 py-5`
        : divPadre.className = `${producto.tipo} w-100 d-flex flex-column align-items-end pe-5 py-5`;

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
    `;

    const contenedorProducto = document.getElementById(`${producto.categoria}`);
    contenedorProducto.appendChild(divPadre);

    const botonComprar = divPadre.querySelector(`.btnComprar${producto.id}`);
    botonComprar.addEventListener('click', () => {
        comprar(botonComprar);
    });
}

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito'); //boton vaciar del nav-bar
botonVaciarCarrito.addEventListener('click', manejarCarrito); //implementa manejar carrito

const sidebarButton = document.getElementById('sidebarButton');
sidebarButton.addEventListener('click', abrirSidebar); //implementa abrirSidebar con la lógica que implica (ver carrito.js)
