import { abrirSidebar, manejarCarrito } from "./carrito.js";

async function obtenerMates() {
    const response = await fetch("../js/data.json")
    const data = await response.json();

    return data.mates;
}

async function mostrarMates() {
    try{
        const listaMates = await obtenerMates();
        listaMates.forEach((mate)=>{
            crearTarjetaMate(mate);
        })
    }catch(error){
        console.log(`ERROR DE TIPO: ${error}`)
    }
}

function validarStorage(storage, valorDefault){
    if (storage) {
        return storage
    }
    return valorDefault
}

let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.getElementById('totalMiniCarrito');
let subTotal = 0;

contadorElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'), 0);
subTotalCarrito.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0)

function renderDescripcion(array){
    let html = "";
    for (let i = 0; i < array.length; i++) {
        if(i===0){
            html+=`<p class="fs-2 fw-bolder">${array[i]}</p>`
        } else{
            html+=`<p class="fs-5 fw-normal">${array[i]}</p>`
        }
    }
    return html;
}


function crearTarjetaMate(producto){
    const divPadre = document.createElement('div');
    (producto.id % 2 === 0)
    ? divPadre.className = `mate w-100 d-flex flex-column align-items-start ps-5 py-5`
    : divPadre.className = `mate w-100 d-flex flex-column align-items-end pe-5 py-5`;

    divPadre.innerHTML=`
        <div class="fila d-flex flex-row w-50" data-aos="fade-right">
          <div class="imagen w-50">
            <a href="../pages/contacto.html">
              <img src="${producto.imagen}" alt="${producto.nombre}">
            </a>
          </div>
          <div class="parrafos d-flex flex-column ps-3">
            <p class="fs-2 fw-bolder">${producto.nombre}</p>
            ${renderDescripcion(producto.descripcion)}
            <p class="fs-5 fw-normal">$ ${producto.precio},00</p>
            <p class="fs-5 fw-normal">${producto.cuotas}</p>
            <hr>
            <div class="inputCantidadYagregar d-flex flex-row align-items-center">
                <label for="inputCantidad${producto.id}" class="visually-hidden">Cantidad</label>
                <input name="cantidadParaAgregar" id="inputCantidad${producto.id}" class="inputCantidad" type="number" value="1" min="1">
                <button class="button btn btn-dark btnComprar${producto.id}" data-name="${producto.nombre}" data-id="${producto.id}" data-precio="${producto.precio}" data-img="${producto.imagen}" data-categoria="${producto.categoria}">Agregar al carrito</button>
            </div>
          </div>
        </div>
    `
    
    const contenedorMates = document.querySelector('.containerMates');
    contenedorMates.appendChild(divPadre);

    const botonComprar = divPadre.querySelector(`.btnComprar${producto.id}`);
    botonComprar.addEventListener('click',()=>{
        const idMate = botonComprar.getAttribute('data-id');
        const nombreMate = botonComprar.getAttribute('data-name');
        const precioMate = botonComprar.getAttribute('data-precio');
        const imagenMate = botonComprar.getAttribute('data-img');
        const categoriaMate = botonComprar.getAttribute('data-categoria');
        let carrito;
        
        if (localStorage.getItem('carrito') === null) {
            carrito = [];
        } else {
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }

        const inputCantidad = document.getElementById(`inputCantidad${producto.id}`);

        let mate = {
            'id':idMate,
            'nombre':nombreMate,
            'precio':precioMate,
            'imagen':imagenMate,
            'categoria':categoriaMate
        }
        for (let i = 0; i <inputCantidad.value; i++) {
            carrito.push(mate);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        let productosAlmacenados = Number(contadorElementosCarrito.textContent);
        (localStorage.getItem('subTotalProductos') === null)
        ? subTotal+=parseInt(precioMate*inputCantidad.value)
        : subTotal = parseInt(precioMate*inputCantidad.value)+ Number(localStorage.getItem('subTotalProductos'));
        productosAlmacenados+=Number(inputCantidad.value)
        localStorage.setItem('contadorProductos', Number(productosAlmacenados));
        localStorage.setItem('subTotalProductos', Number(subTotal));
        contadorElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
        subTotalCarrito.innerHTML = localStorage.getItem('subTotalProductos');
        
        swal(`¡ Se agregaron x${inputCantidad.value} ${nombreMate} al carrito!`,"", "success");
    })
}


const sidebarButton = document.getElementById('sidebarButton');
sidebarButton.addEventListener('click',abrirSidebar);
sidebarButton.addEventListener('click',()=>{
    subTotal=0;
})


const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');
botonVaciarCarrito.addEventListener('click', manejarCarrito);
botonVaciarCarrito.addEventListener('click', limpiarSubtotal);

function limpiarSubtotal(){
    subTotal=0;
}


mostrarMates();