import { Termos } from "../clases/Termos.js";
import { mostrarProductos } from "../Logica producto/mostrarProducto.js";

const termos = new Termos();
let arrayTermos = await termos.cargarTermos();

mostrarProductos(arrayTermos);