import { obtenerProductos } from "../url.js";

export class Mates{
    _mates = [];

    async cargarMates(){
        try{
            const data = await obtenerProductos();
            this._mates = data.mates;
            return this._mates;
        } catch(e){
            console.error(e)
        }
    }
}