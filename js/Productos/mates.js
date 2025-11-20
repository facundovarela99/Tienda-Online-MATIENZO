import { mostrarProductos } from "../Logica producto/mostrarProducto.js";
import { Mates } from "../clases/Mates.js";

const mates = new Mates();
let arrayMates = await mates.cargarMates();

mostrarProductos(arrayMates);