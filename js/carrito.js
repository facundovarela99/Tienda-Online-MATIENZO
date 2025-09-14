
export function abrirSidebar(){
    localStorage.setItem('constante', 0);
    const bodySideBar = document.getElementById('sideBarBody');
    bodySideBar.innerHTML= `
        <div class="divHrOffcanvas">
            <hr class="hrOffcanvas">
        </div>
        <div class="divListaProductos"></div>
        <div class="divHrOffcanvas">
            <hr class="hrOffcanvas">
        </div>
        <div class="divSubtotalSidebar d-flex flex-row">
            <h6>Subtotal: $</h6>
            <span class="spanSubtotal"></span>
        </div>
        <div>
            <button id="btnVaciarCarritoSideBar" style="font-family: Fjalla One; padding: 5px;">Vaciar carrito</button>
        </div>
    `;

    (localStorage.getItem('subTotalProductos')===null)
    ? document.querySelector('.spanSubtotal').innerHTML = 0
    : document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos');

    const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    const contenedorSidebarProductos = document.querySelector('.divListaProductos');

    carrito.forEach((producto) => {        
        const etiquetaProductoEnCarrito = document.createElement('div')
        etiquetaProductoEnCarrito.className = 'productoCarrito';
        etiquetaProductoEnCarrito.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="140">
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">${producto.nombre}</h6>
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">$${producto.precio}</h6>
        `;
        contenedorSidebarProductos.appendChild(etiquetaProductoEnCarrito);
    })
    
    const btnVaciarCarritoSideBar = document.getElementById('btnVaciarCarritoSideBar');
    btnVaciarCarritoSideBar.addEventListener('click', manejarCarrito);
};


const cantidadElementosCarrito = document.getElementById('cantidadItemsCarrito');
const subTotalProductos = document.getElementById('totalMiniCarrito');

function vaciarCarrito() {
    localStorage.removeItem('carrito')
    localStorage.removeItem('contadorProductos');
    localStorage.removeItem('subTotalProductos');
    cantidadElementosCarrito.innerHTML = 0;
    subTotalProductos.innerHTML = 0;
    document.querySelector('.divListaProductos').innerHTML="";
    document.querySelector('.spanSubtotal').innerHTML = 0;
}

export function manejarCarrito(){
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
        }else{
            swal('No hay elementos en el carrito')
        }
}


