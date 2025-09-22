import { abrirSidebar, manejarCarrito } from "./carrito.js"; //Importamos funciones para ser llamadas desde los HTML que consuman main.js

export default function validarStorage(localstorage, valorDefault){ //función que recibe una key del localStorage
    if (localstorage) {      //Si se encuentra
        return localstorage;    //La retorna
    } 
    return valorDefault; //Si no la encuentra, retorna el valor default pasado por parámetro
}

const cantidadElementosCarrito = document.getElementById('cantidadItemsCarrito'); // contador de productos del carrito en el nav-bar
const subTotalProductos = document.getElementById('totalMiniCarrito'); //subtotal de productos de productos del carrito en el nav-bar

cantidadElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'), 0); //Si hay un clave contador de productos, se le asigna, si no, se le asigna 0
subTotalProductos.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0); //Si hay un clave subtotal de productos, se le asigna, si no, se le asigna 0

const botonSideBar = document.getElementById('sidebarButton'); //Boton para abrir/ver el carrito 
botonSideBar.addEventListener('click', abrirSidebar) //llama a la función abrirSidebar de carrito.js

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito'); //Boton vaciar carrito del nav-bar
botonVaciarCarrito.addEventListener('click',manejarCarrito); //llama a la función manejarCarrito de carrito.js

