import { abrirSidebar, manejarCarrito } from "./carrito.js";

const cantidadElementosCarrito = document.getElementById('cantidadItemsCarrito');
const subTotalProductos = document.getElementById('totalMiniCarrito');

if (localStorage.getItem('contadorProductos') === null && localStorage.getItem('subTotalProductos') === null) {
    cantidadElementosCarrito.innerHTML = 0;
    subTotalProductos.innerHTML = 0;
} else {
    cantidadElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
    subTotalProductos.innerHTML = localStorage.getItem('subTotalProductos');
}


const botonSideBar = document.getElementById('sidebarButton');
botonSideBar.addEventListener('click', abrirSidebar)

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');
botonVaciarCarrito.addEventListener('click',manejarCarrito);

