import { abrirSidebar } from "./carrito.js";

const cantidadElementosCarrito = document.getElementById('cantidadItemsCarrito');
const subTotalProductos = document.getElementById('totalMiniCarrito');
const divListaProductos = document.querySelector('.divListaProductos');

if (localStorage.getItem('contadorProductos') === null && localStorage.getItem('subTotalProductos') === null) {
    cantidadElementosCarrito.innerHTML = 0;
    subTotalProductos.innerHTML = 0;
    divListaProductos.innerHTML = "";

} else {
    cantidadElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
    subTotalProductos.innerHTML = localStorage.getItem('subTotalProductos');
}


const botonSideBar = document.getElementById('sidebarButton');
botonSideBar.addEventListener('click', abrirSidebar)

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');

function vaciarCarrito() {
    localStorage.removeItem('carrito')
    localStorage.removeItem('contadorProductos');
    localStorage.removeItem('subTotalProductos');
    cantidadElementosCarrito.innerHTML = 0;
    subTotalProductos.innerHTML = 0;
}

botonVaciarCarrito.addEventListener('click', () => {
    if (localStorage.getItem('contadorProductos')) {
        swal({
            title: "¿Está seguro de que desea vaciar el carrito?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Su carrito fue vaciado", {
                        icon: "success",
                    });
                    vaciarCarrito();
                }
            });
        }
})

