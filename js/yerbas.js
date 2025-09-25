import { abrirSidebar, manejarCarrito } from "./carrito.js";
import validarStorage from "./main.js";

const url = "../js/data.json";

fetch(url)      //Se trae el contenido de data.json
    .then(res => res.json())
    .then(data => mostrarYerbas(data.yerbas)) //se aplica la función a la respuesta de fetch, en este caso los productos de la categoría yerbas
    .catch(err => console.error("Error cargando JSON:", err));


let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.getElementById('totalMiniCarrito');
let subTotal = 0;

contadorElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'), 0);
subTotalCarrito.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'), 0);

const contenedorYerbas = document.querySelector('.containerYerbas');  //contenedor de las tarjetas de yerbas

function renderDescripcion(array) { //Función que se encarga de renderizar el array de descripción del objeto json
    let html = ""
    for (let i = 0; i < array.length; i++) {
        if (i === 0) { //si i = 0
            html += `<p class="fs-2 fw-bolder">${array[i]}</p>`; //se le aplica mayor tamaño y negrita
        } else {
            html += `<p class="fs-5 fw-normal ps-5">${array[i]}</p>`; //se le aplica menor tamaño e intensidad normal, junto con un poco de padding-left
        }
    }
    return html; //retorna la lista de parrafos renderizada
}

function mostrarYerbas(yerbas) { //Función que se encarga de renderizar los productos que se trajo como respuesta.
    yerbas.forEach(yerba => { //Por cada producto de la categoría/objeto traid, se crea las tarjetas inyectando contenido dinámicamente:
        const divPadre = document.createElement('div');
        (yerba.id % 2 === 0) //Si el id es par
            ? divPadre.className = 'yerba w-100 d-flex flex-column align-items-start ps-5 py-5' //Se muestra del lado izquierdo
            : divPadre.className = 'yerba w-100 d-flex flex-column align-items-end pe-5 py-5' //Si no, se muestra del lado derecho
        divPadre.innerHTML = `
            <div class="fila d-flex flex-row w-50" data-aos="fade-right">
            <div class="imagen w-50">
                <a href="#">
                <img src="${yerba.imagen}" alt="${yerba.nombre}" id="anclaYerba${yerba.id}">
                </a>
            </div>
            <div class="parrafos d-flex flex-column ps-3">
                <p class="fs-2 fw-bolder">${yerba.nombre}</p>
                ${renderDescripcion(yerba.descripcion)}
                <p class="fs-5 fw-normal ps-5">$ ${yerba.precio}.00</p>
                <hr>
                <div class="inputCantidadYagregar d-flex flex-row align-items-center">
                    <label for="inputCantidad${yerba.id}" class="visually-hidden">Cantidad</label>
                    <input name="cantidadParaAgregar" id="inputCantidad${yerba.id}" class="inputCantidad" type="number" value="1" min="1">
                    <button class="button btnComprar${yerba.id} btn btn-dark buttonAddToCart" data-name="${yerba.nombre}" data-id="${yerba.id}" data-precio="${yerba.precio}" data-img="${yerba.imagen}" data-categoria="${yerba.categoria}">Agregar al carrito</button>
                </div>
            </div>
            </div>
        ` //Contenido de cada tarjeta inyectado dinámicamente
        contenedorYerbas.appendChild(divPadre);

        const botonComprar = document.querySelector(`.btnComprar${yerba.id}`); //Lógica del boton para 'agregar al carrito' un producto seleccionado
        botonComprar.addEventListener('click', () => {
            const nombreYerba = botonComprar.getAttribute('data-name');
            const idYerba = botonComprar.getAttribute('data-id');
            const precioYerba = botonComprar.getAttribute('data-precio');
            const imagenYerba = botonComprar.getAttribute('data-img');
            const categoriaYerba = botonComprar.getAttribute('data-categoria');

            let carrito;

            if (localStorage.getItem('carrito') === null) {
                carrito = [];
            } else {
                carrito = JSON.parse(localStorage.getItem('carrito'));
            }

            const inputCantidad = document.getElementById(`inputCantidad${yerba.id}`); //input de la cantidad de productos a querer agregar al carro

            let nuevoProducto = { //objeto literal, con los valores traídos al presionar el boton 'agregar al carrito'
                'id': idYerba,
                'nombre': nombreYerba,
                'precio': precioYerba,
                'imagen': imagenYerba,
                'categoria': categoriaYerba
            };

            for (let i = 0; i < inputCantidad.value; i++) {
                carrito.push(nuevoProducto); //se agrega la cantidad del input al carrito
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            let productosAlmacenados = Number(contadorElementosCarrito.textContent);
            (localStorage.getItem('subTotalProductos') === null)
                ? subTotal += parseInt(precioYerba * inputCantidad.value)
                : subTotal = parseInt(precioYerba * inputCantidad.value) + Number(localStorage.getItem('subTotalProductos'))
            productosAlmacenados += Number(inputCantidad.value);
            localStorage.setItem('contadorProductos', Number(productosAlmacenados));
            localStorage.setItem('subTotalProductos', Number(subTotal));
            contadorElementosCarrito.innerHTML = productosAlmacenados;
            subTotalCarrito.innerHTML = subTotal;

            Swal.fire({
                title: `¡ Se agregaron x${inputCantidad.value} ${nombreYerba} al carrito!`,
                icon: "success",
                draggable: true
            });
        });

        const imagenAnclaProducto = document.getElementById(`anclaYerba${yerba.id}`)
        imagenAnclaProducto.addEventListener('click', () => {
            Swal.fire({
                title: "Sweet!",
                text: "Modal with a custom image.",
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
            });
        })


    });
};

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito'); //boton vaciar del nav-bar
botonVaciarCarrito.addEventListener('click', manejarCarrito); //implementa manejar carrito
botonVaciarCarrito.addEventListener('click', () => {
    subTotal = 0
}); //limpia el acumulador subtotal


const botonSideBar = document.getElementById('sidebarButton'); //boton que abre el sidebar (carrito)
botonSideBar.addEventListener('click', abrirSidebar); //implementa abrirSidebar con la lógica que implica (ver carrito.js)
botonSideBar.addEventListener('click', () => {
    subTotal = 0
}) //limpia el acumulador subtotal

