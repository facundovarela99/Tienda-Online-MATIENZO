import { obtenerProductos } from "../url.js";

export class Yerbas {
    _yerbas = [];

    async cargarYerbas() {
        try {
            const data = await obtenerProductos();
            this._yerbas = data.yerbas
            return this._yerbas;
        } catch (e) {
            console.error(e);
        }
    }
}