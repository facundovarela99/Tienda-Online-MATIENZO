import { abrirSidebar, manejarCarrito } from "./carrito.js";

const url = "../js/data.json";

fetch(url)
    .then(res => res.json())
    .then(data => mostrarTermos(data.termos))
    .catch(err => console.error("Error cargando JSON:", err));

let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.getElementById('totalMiniCarrito');
let subTotal = 0;

function validarStorage(localStorage, valorDefault){
    if (localStorage){
        return localStorage
    } else {
        return valorDefault
    }
}


contadorElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'), 0);
subTotalCarrito.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0);

const contenedorTermos = document.querySelector('.containerTermos');

function renderDescripcion(array){
    let html = "";
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            html += `<p class="fs-2 fw-bolder">${array[i]}</p>`;
        } else{
            html += `<p class="fs-4 fw-normal ps-5">${array[i]}</p>`;
        }   
    }
    return html;
}


function mostrarTermos(termos){
    termos.forEach((termo)=>{
        const divPadre = document.createElement('div');
        (termo.id % 2 === 0)
        ? divPadre.className = "termo1 w-100 d-flex flex-column align-items-start ps-5 py-5"
        : divPadre.className = "termo1 w-100 d-flex flex-column align-items-end pe-5 py-5"

        divPadre.innerHTML=`
            <div class="fila d-flex flex-row w-50" data-aos="fade-right">
                <div class="imagen w-50">
                    <a href="../pages/contacto.html">
                        <img src="${termo.imagen}" alt="${termo.nombre}">
                    </a>
                </div>
                <div class="parrafos d-flex flex-column ps-3">
                    <p class="fs-2 fw-bolder">${termo.nombre}</p>
                    ${renderDescripcion(termo.descripcion)}
                    <p class="fs-4 fw-normal ps-5">$${termo.precio}</p>
                    <p class="fs-5 fw-normal ps-5">${termo.cuotas}</p>
                    <hr>
                    <div class="inputCantidadYagregar d-flex flex-row align-items-center">
                        <label for="inputCantidad${termo.id}" class="visually-hidden">Cantidad</label>
                        <input name="cantidadParaAgregar" id="inputCantidad${termo.id}" class="inputCantidad" type="number" value="1" min="1">
                        <button class="button btn btn-dark btnComprar${termo.id}" data-id="${termo.id}" data-nombre="${termo.nombre}" data-precio="${termo.precio}" data-imagen="${termo.imagen}" data-categoria="${termo.categoria}">Agregar al
                        carrito</button>
                    </div>
                </div>
            </div>
        `
        contenedorTermos.appendChild(divPadre);

        const botonComprar = document.querySelector(`.btnComprar${termo.id}`);
        botonComprar.addEventListener('click',()=>{
            const idTermo = botonComprar.getAttribute('data-id');
            const nombreTermo = botonComprar.getAttribute('data-nombre');
            const precioTermo = botonComprar.getAttribute('data-precio');
            const imagenTermo = botonComprar.getAttribute('data-imagen');
            const categoriaTermo = botonComprar.getAttribute('data-categoria');

            let carrito;

            (localStorage.getItem('carrito') === null)
            ? carrito = []
            : carrito = JSON.parse(localStorage.getItem('carrito'));

            const inputCantidad = document.getElementById(`inputCantidad${termo.id}`);

            let nuevoProducto = {
                "id":idTermo,
                "nombre":nombreTermo,
                "precio":precioTermo,
                "imagen":imagenTermo,
                "categoria":categoriaTermo
            };

            for (let i = 0; i < inputCantidad.value; i++) {
                carrito.push(nuevoProducto);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            let productosAlmacenados = Number(contadorElementosCarrito.textContent);
            (localStorage.getItem('subTotalProductos') ===  null)
            ? subTotal += parseInt(precioTermo*inputCantidad.value)
            : subTotal = parseInt(precioTermo*inputCantidad.value)+Number(localStorage.getItem('subTotalProductos'));
            productosAlmacenados+=Number(inputCantidad.value);
            localStorage.setItem('contadorProductos', Number(productosAlmacenados));
            localStorage.setItem('subTotalProductos', Number(subTotal))
            contadorElementosCarrito.innerHTML = productosAlmacenados;
            subTotalCarrito.innerHTML = subTotal;

            swal(`¡ Se agregaron x${inputCantidad.value} ${nombreTermo} al carrito!`,"", "success");

        });
    });
};

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');
botonVaciarCarrito.addEventListener('click', manejarCarrito);
botonVaciarCarrito.addEventListener('click', limpiarSubtotal);

function limpiarSubtotal(){
    subTotal=0;
}


const botonSideBar = document.getElementById('sidebarButton');
botonSideBar.addEventListener('click',abrirSidebar);
botonSideBar.addEventListener('click',()=>{
    subTotal=0;
})