import { mostrarProductos } from "../Logica producto/mostrarProducto.js";
import { Bombillas } from "../clases/Bombillas.js";

const bombillas = new Bombillas();
let arrayBombillas = await bombillas.cargarBombillas(); 

mostrarProductos(arrayBombillas);