//Script que maneja la lógica del carrito en general
import validarStorage from "./main.js";

function renderBotonesCarrito(localStorage) { //Renderizado de los botones por cada producto en el carro siempre y cuando haya productos en el mismo
    let html = "";
    if (localStorage) {
        html += `
        <button class="btn btn-success btn-sm" id="btnPagarCarritoSideBar" style="padding: 5px; color: black;"><a href="https://www.mercadopago.com.ar/" target="_blank" style="color: inherit; text-decoration: none; font-family: Fjalla One;">Ir a pagar</a></button>
        <button class="btn btn-danger btn-sm" id="btnVaciarCarritoSideBar" style="font-family: Fjalla One; padding: 5px; color: black">Vaciar carrito</button>`;
        return html
    }
    return html;
}

export function abrirSidebar() { //Función que maneja la lógica del side-bar, el cual funciona como carrito en lugar de un nuevo HTML, renderizando el contenido dinámicamente
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

    const spanSubtotal = document.querySelector('.spanSubtotal'); //contador subtotal del carrito
    spanSubtotal.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0);

    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
    const contenedorSidebarProductos = document.querySelector('.divListaProductos'); //contenedor de las tarjetas de productos en el carrito

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
        const etiquetaProductoEnCarrito = document.createElement('div'); //Se crea una etiqueta por cada tarjeta
        etiquetaProductoEnCarrito.className = "productoCarrito";           //asignandole una className
        etiquetaProductoEnCarrito.id = `id${producto.id}`;                 //y un id
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

        const btnQuitarProducto = document.getElementById(`botonQuitar${producto.id}`); //Lógica del boton para remover un conjunto de productos de la misma categoría del carrito con SweetAlert (pendiente remover una cantidad seleccionada)
        btnQuitarProducto.addEventListener('click', () => {

            Swal.fire({
                title: "¿Está seguro de que quiere remover este producto del carrito?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Vaciar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `Se removió ${producto.nombre} del carrito`,
                        icon: "success"
                    });
                    carrito = quitarProducto(producto, carrito);
                }
            });
        })
    }

    const btnVaciarCarritoSideBar = document.getElementById('btnVaciarCarritoSideBar'); //boton de vaciar carrito del nav-bar
    btnVaciarCarritoSideBar && btnVaciarCarritoSideBar.addEventListener('click', manejarCarrito); //Si hay un boton para vaciar el carrito, hacer click sobre el mismo llama a manejarCarrito
};

const cantidadElementosCarrito = document.getElementById('cantidadItemsCarrito'); //contador de items del carrito
const subTotalProductos = document.getElementById('totalMiniCarrito');  //acumulador del subtotal

function quitarProducto(prod, carro) { //Función que se encarga de remover un producto seleccionado del carro

    document.getElementById(`id${prod.id}`).innerHTML = ""; //Limpia el contenido del producto seleccionado por su id

    const sinProducto = carro.filter(PROD => PROD.id !== prod.id); //constante que toma elementos del carrito filtrando por aquellos que no se le haya hecho click para remover
    localStorage.setItem('carrito', JSON.stringify(sinProducto));  //se reemplaza el array actual por uno que no contenga el producto removido 
    let contadorActual = Number(localStorage.getItem('contadorProductos'));
    localStorage.setItem('contadorProductos', contadorActual - prod.cantidad) //se le resta al contador de productos la cantidad removida de cada uno
    let subtotalActual = Number(localStorage.getItem('subTotalProductos'));
    localStorage.setItem('subTotalProductos', subtotalActual - (prod.precio * prod.cantidad)); //Se le resta al acumulador de precio el precio por la cantidad removida

    cantidadElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');   //se recupera la cantidad actual de productos
    subTotalProductos.innerHTML = localStorage.getItem('subTotalProductos');          //se recupera el subtotal actual del carrito
    document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos'); //Subtotal de productos renderizado en el carro

    if (localStorage.getItem('subTotalProductos') <= 0 || localStorage.getItem('contadorProductos') <= 0) { //si el subtotal o el contador de productos son menores o iguales a 0
        vaciarCarrito();  //se llama a vaciar carrito
    }
    return sinProducto;
}

function vaciarCarrito() { //Función que se encarga de vaciar el carrito completo (junto con el localStorage)
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


