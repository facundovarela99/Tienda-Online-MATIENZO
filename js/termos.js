import { abrirSidebar } from "./carrito.js";

const url = "../js/data.json";

fetch(url)
    .then(res => res.json())
    .then(data => mostrarTermos(data.termos))
    .catch(err => console.error("Error cargando JSON:", err));

let contadorElementosCarrito = document.getElementById('cantidadItemsCarrito');
let subTotalCarrito = document.querySelector('.totalMiniCarrito');
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
    html = "";
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
                    <button class="button btn btn-dark btnComprar${termo.id}" data-id="${termo.id}" data-nombre="${termo.nombre}" data-precio="${termo.precio}" data-imagen="${termo.imagen}">Agregar al
                    carrito</button>
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

            let carrito;

            (localStorage.getItem('carrito') === null)
            ? carrito = []
            : carrito = JSON.parse(localStorage.getItem('carrito'));

            let nuevoProducto = {
                "id":idTermo,
                "nombre":nombreTermo,
                "precio":precioTermo,
                "imagen":imagenTermo
            };

            carrito.push(nuevoProducto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            (localStorage.getItem('subTotalProductos') ===  null)
            ? subTotal += parseInt(precioTermo)
            : subTotal = parseInt(precioTermo)+Number(localStorage.getItem('subTotalProductos'));
            localStorage.setItem('subTotalProductos', Number(subTotal))
            subTotalCarrito.innerHTML = subTotal;
            let productosAlmacenados;
            productosAlmacenados = validarStorage(localStorage.getItem('contadorProductos'), Number(contadorElementosCarrito.textContent));
            productosAlmacenados++;
            localStorage.setItem('contadorProductos', Number(productosAlmacenados));
            contadorElementosCarrito.innerHTML = productosAlmacenados;
        });
    });
};

const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');
function vaciarCarrito() {
    localStorage.removeItem('carrito')
    localStorage.removeItem('contadorProductos');
    localStorage.removeItem('subTotalProductos');
    contadorElementosCarrito.innerHTML = 0;
    subTotalCarrito.innerHTML = 0;
}

botonVaciarCarrito.addEventListener('click', () => {
    if (localStorage.getItem('contadorProductos')) {
        swal({
            title: "¿Está seguro de que desea vaciar el carrito?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Su carrito fue vaciado", {
                        icon: "success",
                    });
                    vaciarCarrito();
                }
            });
    }

})


const botonSideBar = document.getElementById('sidebarButton');
botonSideBar.addEventListener('click',abrirSidebar);