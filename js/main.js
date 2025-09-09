const contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
const subTotalYerbas = document.getElementById('totalMiniCarrito');
const divListaProductos = document.querySelector('.divListaProductos');

if (localStorage.getItem('contadorProductos') === null && localStorage.getItem('subTotalProductos') === null) {
    contadorElementosCarrito.innerHTML = 0;
    subTotalYerbas.innerHTML = 0;
    divListaProductos.innerHTML = "";

} else {
    contadorElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
    subTotalYerbas.innerHTML = localStorage.getItem('subTotalProductos');
}

const botonSideBar = document.getElementById('sidebarButton');
const contenedorBodySidebar = document.querySelector('.divListaProductos');

botonSideBar.addEventListener('click', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    contenedorBodySidebar.innerHTML = "";

    carrito.forEach((producto) => {
        const etiquetaProductoEnCarrito = document.createElement('div')
        etiquetaProductoEnCarrito.className = 'productoCarrito';
        etiquetaProductoEnCarrito.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="140">
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">${producto.nombre}</h6>
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">$${producto.precio}</h6>
        `;
        contenedorBodySidebar.appendChild(etiquetaProductoEnCarrito);
        document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos');
    })
})

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');

botonVaciarCarrito.addEventListener('click', () => {
    localStorage.removeItem('carrito')
    localStorage.removeItem('contadorProductos');
    localStorage.removeItem('subTotalProductos');
    contadorElementosCarrito.innerHTML = 0;
    subTotalYerbas.innerHTML = 0;
    // swal({
    //     title: "Are you sure?",
    //     text: "Once deleted, you will not be able to recover this imaginary file!",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    // })
    //     .then((willDelete) => {
    //         if (willDelete) {
    //             swal("Poof! Your imaginary file has been deleted!", {
    //                 icon: "success",
    //             });
    //         } else {
    //             swal("Your imaginary file is safe!");
    //         }
    //     });
})

