import { Yerbas } from "../clases/Yerbas.js";
import { mostrarProductos } from "../Logica producto/mostrarProducto.js";

const yerbas = new Yerbas();
let arrayYerbas = await yerbas.cargarYerbas();

mostrarProductos(arrayYerbas);