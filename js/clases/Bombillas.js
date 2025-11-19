import { obtenerProductos } from "../url.js";

export class Bombillas {
    _bombillas = [];

    async cargarBombillas() {
        try {
            const data = await obtenerProductos();
            this._bombillas = data.bombillas;
            return this._bombillas;
        } catch (e) {
            console.error(e);
        }
    }
}
