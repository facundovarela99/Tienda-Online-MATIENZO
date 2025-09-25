import { crearTarjetaProducto} from "./producto.js";

const url = "../js/data.json";

async function obtenerProductos() {
    const response = await fetch("../js/data.json");
    return response.json()
}

async function mostrarProductos() {
    try {
        const { yerbas } = await obtenerProductos();
        yerbas.forEach(producto => crearTarjetaProducto(producto));
    } catch (e) {
        console.error(e);
    }
}

mostrarProductos();