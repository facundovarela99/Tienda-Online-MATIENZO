import { obtenerProductos } from "../url.js";

export class Termos{
    _termos = [];

    async cargarTermos(){
        try{
            const data = await obtenerProductos();
            this._termos = data.termos;
            return this._termos;
        } catch(e){
            console.error(e);
        }
    }
}