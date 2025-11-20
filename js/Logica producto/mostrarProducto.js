import { crearTarjetaProducto } from "../Logica producto/producto.js";

export async function mostrarProductos(array) {
    try {
        for (const producto of array) {
            crearTarjetaProducto(producto);
        }
    } catch (e) {
        console.error(e);
    }
}