import { abrirSidebar, manejarCarrito } from "./carrito.js";
import validarStorage from "./main.js";

async function obtenerMates() { //Función asíncrona que espera una respuesta trayendo la data de data.json
    const response = await fetch("../js/data.json")
    const data = await response.json();

    return data.mates; //retorna los objetos de mates
}

async function mostrarMates() { //Función asíncrona que espera la ejecución de obtenerMates
    try {
        const listaMates = await obtenerMates();
        listaMates.forEach((mate) => {
            crearTarjetaMate(mate); //por cada producto, crea la tarjeta
        })
    } catch (error) {
        console.log(`ERROR DE TIPO: ${error}`)
    }
}

let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.getElementById('totalMiniCarrito');
let subTotal = 0;

contadorElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'), 0);
subTotalCarrito.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0)

function renderDescripcion(array) { //Función que se encarga de renderizar el array de descripción del objeto json
    let html = "";
    for (let i = 0; i < array.length; i++) {
        if (i === 0) { //si i = 0
            html += `<p class="fs-2 fw-bolder">${array[i]}</p>` //se le aplica mayor tamaño y negrita
        } else {
            html += `<p class="fs-5 fw-normal">${array[i]}</p>` //se le aplica menor tamaño e intensidad normal
        }
    }
    return html; //retorna la lista de parrafos renderizada
}


function crearTarjetaMate(producto) { //Función que se encarga de renderizar los productos que se trajo como respuesta y crear las cards.
    const divPadre = document.createElement('div');
    (producto.id % 2 === 0) //Si el id es par
        ? divPadre.className = `mate w-100 d-flex flex-column align-items-start ps-5 py-5` //Se muestra del lado izquierdo
        : divPadre.className = `mate w-100 d-flex flex-column align-items-end pe-5 py-5`; //Si no, se muestra del lado derecho

    divPadre.innerHTML = `
        <div class="fila d-flex flex-row w-50" data-aos="fade-right">
          <div class="imagen w-50">
              <img src="${producto.imagen}" alt="${producto.nombre}" id="anclaMate${producto.id}">
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
    ` //Contenido de cada tarjeta inyectado dinámicamente

    const contenedorMates = document.querySelector('.containerMates'); //contenedor de las tarjetas de yerbas
    contenedorMates.appendChild(divPadre);

    const botonComprar = divPadre.querySelector(`.btnComprar${producto.id}`);  //Lógica del boton para 'agregar al carrito' un producto seleccionado
    botonComprar.addEventListener('click', () => {
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

        const inputCantidad = document.getElementById(`inputCantidad${producto.id}`); //input de la cantidad de productos a querer agregar al carro

        let mate = { //objeto literal, con los valores traídos al presionar el boton 'agregar al carrito'
            'id': idMate,
            'nombre': nombreMate,
            'precio': precioMate,
            'imagen': imagenMate,
            'categoria': categoriaMate
        }
        for (let i = 0; i < inputCantidad.value; i++) {
            carrito.push(mate); //se agrega la cantidad del input al carrito
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        let productosAlmacenados = Number(contadorElementosCarrito.textContent);
        (localStorage.getItem('subTotalProductos') === null)
            ? subTotal += parseInt(precioMate * inputCantidad.value)
            : subTotal = parseInt(precioMate * inputCantidad.value) + Number(localStorage.getItem('subTotalProductos'));
        productosAlmacenados += Number(inputCantidad.value)
        localStorage.setItem('contadorProductos', Number(productosAlmacenados));
        localStorage.setItem('subTotalProductos', Number(subTotal));
        contadorElementosCarrito.innerHTML = productosAlmacenados;
        subTotalCarrito.innerHTML = subTotal;

        Swal.fire({
            title: `¡ Se agregaron x${inputCantidad.value} ${nombreMate} al carrito!`,
            icon: "success",
            draggable: true
        });

        
    });
    const imagenProducto = divPadre.querySelector(`#anclaMate${producto.id}`);
    imagenProducto.addEventListener('click', () => {
        Swal.fire({
            title: `${producto.nombre}`,
            imageUrl: `${producto.imagen}`,
            imageWidth: 250,
            imageHeight: 250,
            imageAlt: `${producto.nombre}`
        });
    });
}


const botonVaciarCarrito = document.getElementById('btnVaciarCarrito'); //boton vaciar del nav-bar
botonVaciarCarrito.addEventListener('click', manejarCarrito); //implementa manejar carrito
botonVaciarCarrito.addEventListener('click', () => {
    subTotal = 0;
}); //limpia el acumulador subtotal

const sidebarButton = document.getElementById('sidebarButton');
sidebarButton.addEventListener('click', abrirSidebar); //implementa abrirSidebar con la lógica que implica (ver carrito.js)
sidebarButton.addEventListener('click', () => {
    subTotal = 0;
}); //limpia el acumulador subtotal

mostrarMates(); //Al abrir la página, ejecuta toda la lógica que implica mostrarMates