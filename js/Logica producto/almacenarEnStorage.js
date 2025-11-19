export function almacenarEnStorage(carrito, producto, contadorElementosCarrito, inputCantidad, subTotal, subTotalCarrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    let productosAlmacenados = Number(contadorElementosCarrito.textContent);
    (localStorage.getItem('subTotalProductos') === null)
        ? subTotal += parseInt(producto.precio * inputCantidad.value)
        : subTotal = parseInt(producto.precio * inputCantidad.value) + Number(localStorage.getItem('subTotalProductos'));
    productosAlmacenados += Number(inputCantidad.value)
    localStorage.setItem('contadorProductos', Number(productosAlmacenados));
    localStorage.setItem('subTotalProductos', Number(subTotal));
    contadorElementosCarrito.innerHTML = productosAlmacenados;
    subTotalCarrito.innerHTML = subTotal;

    swal(`¡ Se agregaron x${inputCantidad.value} ${producto.nombre} al carrito!`, "", "success");
}