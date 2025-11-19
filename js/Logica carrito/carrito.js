//Script que maneja la lógica del carrito en general
import validarStorage from "../main.js";
import { renderizarSidebar } from "./Sidebar.js";
import { productosEnCarrito } from "./productoEnCarrito.js";
import { vaciarCarrito } from "./vaciarCarrito.js";

export function abrirSidebar() { //Función que maneja la lógica del side-bar, el cual funciona como carrito en lugar de un nuevo HTML, renderizando el contenido dinámicamente
    
    renderizarSidebar();
    const spanSubtotal = document.querySelector('.spanSubtotal'); //contador subtotal del carrito
    spanSubtotal.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0);
    
    productosEnCarrito();

    const btnVaciarCarritoSideBar = document.getElementById('btnVaciarCarritoSideBar'); //boton de vaciar carrito del nav-bar
    btnVaciarCarritoSideBar && btnVaciarCarritoSideBar.addEventListener('click', manejarCarrito); //Si hay un boton para vaciar el carrito, hacer click sobre el mismo llama a manejarCarrito
};

export const cantidadElementosCarrito = document.getElementById('cantidadItemsCarrito'); //contador de items del carrito
export const subTotalProductos = document.getElementById('totalMiniCarrito');  //acumulador del subtotal

export function quitarProducto(prod, carro){ //Función que se encarga de remover un producto seleccionado del carro

    document.getElementById(`id${prod.id}`).innerHTML = ""; //Limpia el contenido del producto seleccionado por su id

    const sinProducto = carro.filter(PROD => PROD.id !== prod.id); //constante que toma elementos del carrito filtrando por aquellos que no se le haya hecho click para remover
    localStorage.setItem('carrito', JSON.stringify(sinProducto));  //se reemplaza el array actual por uno que no contenga el producto removido 
    let contadorActual = Number(localStorage.getItem('contadorProductos'));
    localStorage.setItem('contadorProductos', contadorActual-prod.cantidad) //se le resta al contador de productos la cantidad removida de cada uno
    let subtotalActual = Number(localStorage.getItem('subTotalProductos'));
    localStorage.setItem('subTotalProductos', subtotalActual-(prod.precio*prod.cantidad)); //Se le resta al acumulador de precio el precio por la cantidad removida

    cantidadElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');   //se recupera la cantidad actual de productos
    subTotalProductos.innerHTML = localStorage.getItem('subTotalProductos');          //se recupera el subtotal actual del carrito
    document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos'); //Subtotal de productos renderizado en el carro

    if(localStorage.getItem('subTotalProductos')<= 0 || localStorage.getItem('contadorProductos')<=0) { //si el subtotal o el contador de productos son menores o iguales a 0
        vaciarCarrito();  //se llama a vaciar carrito
    } 
    return sinProducto;
}

export function manejarCarrito() { //Funcion que maneja el vaciado del carrito
    if (localStorage.getItem('contadorProductos')) { //Si hay un contador de productos

        Swal.fire({
            title: "¿Está seguro de que desea vaciar el carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Vaciar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Carrito vaciado.",
                    icon: "success"
                });
                vaciarCarrito();
            }
        });

    } else {                                    //Si no hay un contador (lo que es igual a que no haya productos):
        swal('No hay elementos en el carrito')
    }
}


