import { abrirSidebar, manejarCarrito } from "./carrito.js";
import validarStorage from "./main.js";

const url = "../js/data.json";

fetch(url) //Se trae el contenido de data.json
    .then(res => res.json())
    .then(data => mostrarBombillas(data.bombillas)) //se aplica la función a la respuesta de fetch, en este caso los productos de la categoría bombillas
    .catch(err => console.error("Error cargando JSON:", err));

let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.getElementById('totalMiniCarrito');
let subTotal = 0;

contadorElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'), 0);
subTotalCarrito.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0);

const contenedorBombillas = document.querySelector('.contenedorBombillas'); //contenedor de las tarjetas de bombillas

function renderDescripcion(array) { //Función que se encarga de renderizar el array de descripción del objeto json
    let html = "";
    for (let index = 0; index < array.length; index++) {
        if (index === 0) { //si i = 0
            html += `<p class="fs-2 fw-normal ps-5">${array[index]}</p>` //se le aplica mayor tamaño y negrita
        } else {
            html += `<p class="fs-4 fw-normal ps-5">${array[index]}</p>` //se le aplica menor tamaño e intensidad normal, junto con un poco de padding-left
        }
    }
    return html //retorna la lista de parrafos renderizada
}

function mostrarBombillas(bombillas) { //Función que se encarga de renderizar los productos que se trajo como respuesta.
    bombillas.forEach((bombilla) => { //Por cada producto de la categoría/objeto traid, se crea las tarjetas inyectando contenido dinámicamente:
        const divPadre = document.createElement('div');
        (bombilla.id % 2 === 0) //Si el id es par
            ? divPadre.className = `bombilla w-100 d-flex flex-column align-items-start ps-5 py-5` //Se muestra del lado izquierdo
            : divPadre.className = `bombilla w-100 d-flex flex-column align-items-end pe-5 py-5` //Si no, se muestra del lado derecho

        divPadre.innerHTML = `
            <div class="fila d-flex flex-row w-50" data-aos="fade-right">
                <div class="imagen w-50">
                    <img src="${bombilla.imagen}" alt="${bombilla.nombre}" id="anclaBombilla${bombilla.id}">
                </div>
                <div class="parrafos d-flex flex-column ps-3">
                    <p class="fs-2 fw-bolder" id="itemName">${bombilla.nombre}</p>
                    ${renderDescripcion(bombilla.descripcion)}
                    <p class="fs-5 fw-normal ps-5 itemValue">$${bombilla.precio}</p>
                    <p class="fs-5 fw-normal ps-5">${bombilla.cuotas}</p>
                    <hr>
                    <div class="inputCantidadYagregar d-flex flex-row align-items-center">                
                        <label for="inputCantidad${bombilla.id}" class="visually-hidden">Cantidad</label>
                        <input name="cantidadParaAgregar" id="inputCantidad${bombilla.id}" class="inputCantidad" type="number" value="1" min="1">
                        <button class="button btn btn-dark btnComprar${bombilla.id}" data-id="${bombilla.id}" data-nombre="${bombilla.nombre}" data-precio="${bombilla.precio}" data-imagen="${bombilla.imagen}" data-categoria="${bombilla.categoria}">Agregar al
                        carrito</button>
                    </div>
                </div>
            </div>
        `; //Contenido de cada tarjeta inyectado dinámicamente
        contenedorBombillas.appendChild(divPadre);

        const btnComprar = document.querySelector(`.btnComprar${bombilla.id}`); //Lógica del boton para 'agregar al carrito' un producto seleccionado
        btnComprar.addEventListener('click', () => {
            const idBombilla = btnComprar.getAttribute('data-id');
            const nombreBombilla = btnComprar.getAttribute('data-nombre');
            const precioBombilla = btnComprar.getAttribute('data-precio');
            const imagenBombilla = btnComprar.getAttribute('data-imagen');
            const categoriaBombilla = btnComprar.getAttribute('data-categoria');

            let carrito;


            (localStorage.getItem('carrito') === null)
                ? carrito = []
                : carrito = JSON.parse(localStorage.getItem('carrito'));

            const inputCantidad = document.getElementById(`inputCantidad${bombilla.id}`); //input de la cantidad de productos a querer agregar al carro

            let nuevoProducto = { //objeto literal, con los valores traídos al presionar el boton 'agregar al carrito'
                "id": idBombilla,
                "nombre": nombreBombilla,
                "precio": precioBombilla,
                "imagen": imagenBombilla,
                "categoria": categoriaBombilla
            }

            for (let i = 0; i < inputCantidad.value; i++) {
                carrito.push(nuevoProducto); //se agrega la cantidad del input al carrito
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            let productosAlmacenados = Number(contadorElementosCarrito.textContent);
            (localStorage.getItem('subTotalProductos') === null)
                ? subTotal += parseInt(precioBombilla * inputCantidad.value)
                : subTotal = parseInt(precioBombilla * inputCantidad.value) + Number(localStorage.getItem('subTotalProductos'));
            productosAlmacenados += Number(inputCantidad.value);
            localStorage.setItem('contadorProductos', Number(productosAlmacenados));
            localStorage.setItem('subTotalProductos', Number(subTotal));
            contadorElementosCarrito.innerHTML = productosAlmacenados;
            subTotalCarrito.innerHTML = subTotal;

            Swal.fire({
                title: `¡ Se agregaron x${inputCantidad.value} ${nombreBombilla} al carrito!`,
                icon: "success",
                draggable: true
            });

        });

        const imagenProducto = document.getElementById(`anclaBombilla${bombilla.id}`);
        imagenProducto.addEventListener('click', () => {
            Swal.fire({
                title: `${bombilla.nombre}`,
                imageUrl: `${bombilla.imagen}`,
                imageWidth: 250,
                imageHeight: 250,
                imageAlt: `${bombilla.nombre}`
            });
        })
    });
};

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito'); //boton vaciar del nav-bar
botonVaciarCarrito.addEventListener('click', manejarCarrito); //implementa manejar carrito
botonVaciarCarrito.addEventListener('click', () => {
    subTotal = 0;
}); //limpia el acumulador subtotal


const botonSideBar = document.getElementById('sidebarButton'); //boton que abre el sidebar (carrito)
botonSideBar.addEventListener('click', abrirSidebar); //implementa abrirSidebar con la lógica que implica (ver carrito.js)
botonSideBar.addEventListener('click', () => {
    subTotal = 0;
}); //limpia el acumulador subtotal


