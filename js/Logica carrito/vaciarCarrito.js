import { abrirSidebar, manejarCarrito } from "../Logica carrito/carrito.js";

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
