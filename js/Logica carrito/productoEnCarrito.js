import { quitarProducto } from "./carrito.js";

export function productosEnCarrito(){
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
                confirmButtonText: "Aceptar",
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
}