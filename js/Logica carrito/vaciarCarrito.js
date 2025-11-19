import { abrirSidebar, manejarCarrito, cantidadElementosCarrito, subTotalProductos } from "../Logica carrito/carrito.js";

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito'); //boton vaciar del nav-bar
botonVaciarCarrito.addEventListener('click', manejarCarrito); //implementa manejar carrito

const sidebarButton = document.getElementById('sidebarButton');
sidebarButton.addEventListener('click', abrirSidebar); //implementa abrirSidebar con la lógica que implica (ver carrito.js)

export function vaciarCarrito() { //Función que se encarga de vaciar el carrito completo (junto con el localStorage)
    localStorage.clear(); //se limpia el localStorage
    cantidadElementosCarrito.innerHTML = 0; 
    subTotalProductos.innerHTML = 0;
    if (document.querySelector('.divBotonesCarrito')) { //Si hay botones 
        document.querySelector('.divBotonesCarrito').innerHTML = ""; //se limpian
    }
    const listaProductos = document.querySelector('.divListaProductos'); //Si se renderizaron productos 
    if (listaProductos) listaProductos.innerHTML = ""; //Se limpia el contenido

    const spanSubtotal = document.querySelector('.spanSubtotal'); 
    if (spanSubtotal) spanSubtotal.innerHTML = 0 //Si hay un acumulador de subtotal, se limpia
}