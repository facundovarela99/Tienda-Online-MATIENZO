function renderBotonesCarrito(localStorage) {
    let html = "";
    if (localStorage) {
        html += `
        <button class="btn btn-success btn-sm" id="btnPagarCarritoSideBar" style="padding: 5px; color: black;"><a href="https://www.mercadopago.com.ar/" target="_blank" style="color: inherit; text-decoration: none; font-family: Fjalla One;">Ir a pagar</a></button>
        <button class="btn btn-danger btn-sm" id="btnVaciarCarritoSideBar" style="font-family: Fjalla One; padding: 5px; color: black">Vaciar carrito</button>`;
        return html
    }
    return html;
}

export function abrirSidebar() {
    const bodySideBar = document.getElementById('sideBarBody');
    bodySideBar.innerHTML = `
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
        <div class="divBotonesCarrito">
            ${renderBotonesCarrito(localStorage.getItem('contadorProductos'))}
        </div>
    `;

    (localStorage.getItem('subTotalProductos') === null)
        ? document.querySelector('.spanSubtotal').innerHTML = 0
        : document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
    const contenedorSidebarProductos = document.querySelector('.divListaProductos');

    //Lógica para mostrar la cantidad del mismo tipo de producto en el Carrito/Sidebar
    const productosAgrupados = {}; //Crea un objeto vacío para almacenar los productos agrupados por su id.
    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i]; //Obtiene el producto actual del carrito.
        if (!productosAgrupados[producto.id]) { //Verifica si el producto con ese id aún no está en el objeto productosAgrupados.
            productosAgrupados[producto.id] = { ...producto, cantidad: 1 }; //Si no existe, lo agrega al objeto copiando todas sus propiedades y le asigna cantidad: 1.
        } else { //Si el producto ya existe en el objeto...
            productosAgrupados[producto.id].cantidad += 1; //...incrementa la propiedad cantidad en 1.
        }
    }

    // Mostrar solo un bloque por tipo de producto
    for (const id in productosAgrupados) { //Inicia un bucle para recorrer cada producto agrupado por su id.
        const producto = productosAgrupados[id]; //Obtiene el producto agrupado actual.
        const etiquetaProductoEnCarrito = document.createElement('div');
        etiquetaProductoEnCarrito.className = "productoCarrito";
        etiquetaProductoEnCarrito.id = `id${producto.id}`;
        etiquetaProductoEnCarrito.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="140">
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">Producto: ${producto.nombre}</h6>
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">Precio por unidad: $${producto.precio}</h6>
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">Cantidad: ${producto.cantidad}</h6>
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">Precio total: $${producto.precio * producto.cantidad}</h6>
            <button id="botonQuitar${producto.id}" type="button" class="btn btn-warning" style="font-family: Fjalla One">Quitar</button>
            <hr>
        `;
        contenedorSidebarProductos.appendChild(etiquetaProductoEnCarrito);

        const btnQuitarProducto = document.getElementById(`botonQuitar${producto.id}`);
        btnQuitarProducto.addEventListener('click', () => {
            swal({
                title: "¿Está seguro de que quiere remover este producto del carrito?",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal(`Se removió ${producto.nombre} del carrito`, {
                            icon: "success",
                        });
                        carrito = quitarProducto(producto, carrito);
                    }
                });
        })
    }

    const btnVaciarCarritoSideBar = document.getElementById('btnVaciarCarritoSideBar');
    btnVaciarCarritoSideBar && btnVaciarCarritoSideBar.addEventListener('click', manejarCarrito);
};

function quitarProducto(prod, carro){

    document.getElementById(`id${prod.id}`).innerHTML = "";

    const sinProducto = carro.filter(PROD => PROD.id !== prod.id);
    localStorage.setItem('carrito', JSON.stringify(sinProducto)); //CONTINUAR LABURANDO LA LÓGICA
    let contadorActual = Number(localStorage.getItem('contadorProductos'));
    localStorage.setItem('contadorProductos', contadorActual-prod.cantidad)
    let subtotalActual = Number(localStorage.getItem('subTotalProductos'));
    localStorage.setItem('subTotalProductos', subtotalActual-(prod.precio*prod.cantidad));

    cantidadElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
    subTotalProductos.innerHTML = localStorage.getItem('subTotalProductos');
    document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos');

    console.log(sinProducto);
    if(localStorage.getItem('subTotalProductos')<= 0 || localStorage.getItem('contadorProductos')<=0) {
        vaciarCarrito();
    } 
    return sinProducto;
}

const cantidadElementosCarrito = document.getElementById('cantidadItemsCarrito');
const subTotalProductos = document.getElementById('totalMiniCarrito');

function vaciarCarrito() {
    localStorage.clear();
    cantidadElementosCarrito.innerHTML = 0;
    subTotalProductos.innerHTML = 0;
    document.querySelector('.divBotonesCarrito').innerHTML = "";
    const listaProductos = document.querySelector('.divListaProductos');
    if (listaProductos) listaProductos.innerHTML = "";

    const spanSubtotal = document.querySelector('.spanSubtotal');
    if (spanSubtotal) spanSubtotal.innerHTML = 0
}

export function manejarCarrito() {
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
    } else {
        swal('No hay elementos en el carrito')
    }
}


