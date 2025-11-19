import { almacenarEnStorage } from "./almacenarEnStorage.js";
import validarStorage from "../main.js";

let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.getElementById('totalMiniCarrito');
let subTotal = 0;

contadorElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'), 0);
subTotalCarrito.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0);

export function comprar(boton){
    const idProducto = boton.getAttribute('data-id');
    const nombreProducto = boton.getAttribute('data-name');
    const precioProducto = botonComprar.getAttribute('data-precio');
    const imagenProducto = botonComprar.getAttribute('data-img');
    const categoriaProducto = botonComprar.getAttribute('data-categoria');
    let carrito;

    (!localStorage.getItem('carrito'))
    ? carrito = []
    : carrito = JSON.parse(localStorage.getItem('carrito'));

    const inputCantidad = document.getElementById(`inputCantidad${idProducto}`);

    let producto = {
        'id':idProducto,
        'nombre':nombreProducto,
        'precio':precioProducto,
        'imagen':imagenProducto,
        'categoria':categoriaProducto
    }

    for (let i = 0; i < inputCantidad.value; i++) {
        carrito.push(producto);
    }
    almacenarEnStorage(carrito, producto, contadorElementosCarrito, inputCantidad, subTotal, subTotalCarrito);
}