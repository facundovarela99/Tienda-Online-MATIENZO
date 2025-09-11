export function abrirSidebar(){
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
    document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos');
};

