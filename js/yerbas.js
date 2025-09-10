const url = "../js/data.json";

fetch(url)
    .then(res => res.json())
    .then(data => mostrarYerbas(data.yerbas))
    .catch(err => console.error("Error cargando JSON:", err));


let contadorElementosCarrito = document.querySelector('.cantidadItemsCarrito');
let subTotalCarrito = document.querySelector('.totalMiniCarrito');
let subTotal = 0;


if (localStorage.getItem('contadorProductos') === null) {
    contadorElementosCarrito.innerHTML = 0;
} else {
    contadorElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
}


if (localStorage.getItem('subTotalProductos') === null) {
    subTotalCarrito.innerHTML = 0;
} else {
    subTotalCarrito.innerHTML = localStorage.getItem('subTotalProductos');
}

const contenedorYerbas = document.querySelector('.containerYerbas');

function renderDescripcion(array) {
    let html = ""
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            html += `<p class="fs-2 fw-bolder">${array[i]}</p>`;
        } else {
            html += `<p class="fs-5 fw-normal ps-5">${array[i]}</p>`;
        }
    }
    return html;
}

function mostrarYerbas(yerbas) {
    yerbas.forEach(yerba => {
        const divPadre = document.createElement('div');
        (yerba.id % 2 === 0)
        ?divPadre.className = 'yerba w-100 d-flex flex-column align-items-start ps-5 py-5'
        :divPadre.className = 'yerba w-100 d-flex flex-column align-items-end pe-5 py-5'
        divPadre.innerHTML = `
        <div class="fila d-flex flex-row w-50" data-aos="fade-right">
          <div class="imagen w-50">
            <a href="../pages/contacto.html">
              <img src="${yerba.imagen}" alt="${yerba.nombre}">
            </a>
          </div>
          <div class="parrafos d-flex flex-column ps-3">
            <p class="fs-2 fw-bolder">${yerba.nombre}</p>
            ${renderDescripcion(yerba.descripcion)}
            <p class="fs-5 fw-normal ps-5">$ ${yerba.precio}.00</p>
            <button class="button btnComprar${yerba.id} btn btn-dark buttonAddToCart" data-name="${yerba.nombre}" data-id="${yerba.id}" data-precio="${yerba.precio}" data-img="${yerba.imagen}">Agregar al carrito</button>
          </div>
        </div>
        `
        contenedorYerbas.appendChild(divPadre);

        const botonComprar = divPadre.querySelector(`.btnComprar${yerba.id}`);
        botonComprar.addEventListener('click', () => {
            const nombreYerba = botonComprar.getAttribute('data-name');
            const idYerba = botonComprar.getAttribute('data-id');
            const precioYerba = botonComprar.getAttribute('data-precio');
            const imagenYerba = botonComprar.getAttribute('data-img');
            let carrito;

            if (localStorage.getItem('carrito') === null) {
                carrito = [];
            } else {
                carrito = JSON.parse(localStorage.getItem('carrito'));
            }

            let nuevoProducto = {
                'id': idYerba,
                'nombre': nombreYerba,
                'precio': precioYerba,
                'imagen': imagenYerba
            };
            carrito.push(nuevoProducto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            let productosAlmacenados = Number(contadorElementosCarrito.textContent);
            productosAlmacenados++;
            (localStorage.getItem('subTotalProductos') === null)
            ? subTotal += parseInt(precioYerba)
            : subTotal = parseInt(precioYerba)+Number(localStorage.getItem('subTotalProductos'))
            localStorage.setItem('contadorProductos', Number(productosAlmacenados));
            localStorage.setItem('subTotalProductos', Number(subTotal));
            contadorElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
            subTotalCarrito.innerHTML = localStorage.getItem('subTotalProductos');
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

botonSideBar.addEventListener('click', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    const contenedorBodySidebar = document.querySelector('.divListaProductos');
    contenedorBodySidebar.innerHTML = '';

    carrito.forEach((producto) => {
        const etiquetaProductoEnCarrito = document.createElement('div')
        etiquetaProductoEnCarrito.className = 'yerbaCarrito';
        etiquetaProductoEnCarrito.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="140">
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">${producto.nombre}</h6>
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">$${producto.precio}</h6>
        `;
        contenedorBodySidebar.appendChild(etiquetaProductoEnCarrito);
        document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos');
    })
})






// document.addEventListener('DOMContentLoaded', function () {

//     let item = 0;
//     let itemsCarrito = document.querySelector(".cantidadItemsCarrito");
//     let totalMiniCarrito = document.querySelector(".totalMiniCarrito");
//     let acumuladorTotal = 0;

//     if (localStorage.getItem('itemsCarrito') === null && localStorage.getItem('totalMiniCarrito') === null) {
//         itemsCarrito.innerHTML = 0;
//         totalMiniCarrito.innerHTML = 0;
//     } else {
//         itemsCarrito.innerHTML = localStorage.getItem('itemsCarrito');
//         totalMiniCarrito.innerHTML = localStorage.getItem('totalMiniCarrito');
//     }

//     const botonYerba1 = document.querySelector(".buttonAddYerbaToCart1");
//     const botonYerba2 = document.querySelector(".buttonAddYerbaToCart2");
//     const botonYerba3 = document.querySelector(".buttonAddYerbaToCart3");
//     const botonYerba4 = document.querySelector(".buttonAddYerbaToCart4");

//     if (botonYerba1) {
//         let valorYerba1 = parseFloat(document.querySelector(".yerbaValue1").dataset.precioYerba1);
//         botonYerba1.addEventListener('click', function () { //funcion agregarYerba1
//             if (localStorage.getItem('itemsCarrito') === null || localStorage.getItem('itemsCarrito') === 0) {
//                 acumuladorTotal += valorYerba1;
//                 itemsCarrito.innerHTML = (item += 1);
//                 totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//                 localStorage.setItem('itemsCarrito', Number(itemsCarrito.textContent))
//                 localStorage.setItem('totalMiniCarrito', Number(totalMiniCarrito.textContent))
//             } else {
//                 acumuladorTotal += valorYerba1;
//                 itemsCarrito.innerHTML = (item += 1);
//                 totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//                 localStorage.setItem('itemsCarrito', Number(itemsCarrito.textContent))
//                 localStorage.setItem('totalMiniCarrito', Number(totalMiniCarrito.textContent))
//             }
//         })
//     }

//     if (botonYerba2) {
//         let valorYerba2 = parseFloat(document.querySelector(".yerbaValue2").dataset.precioYerba2);
//         botonYerba2.addEventListener('click', function () { //funcion agregarYerba2
//         //  if (localStorage.getItem('itemsCarrito') === null || localStorage.getItem('itemsCarrito') === 0) {
//             acumuladorTotal += valorYerba2;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonYerba3) {
//         let valorYerba3 = parseFloat(document.querySelector(".yerbaValue3").dataset.precioYerba3);
//         botonYerba3.addEventListener('click', function () { //function agregarYerba3
//             acumuladorTotal += valorYerba3;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonYerba4) {
//         let valorYerba4 = parseFloat(document.querySelector(".yerbaValue4").dataset.precioYerba4);
//         botonYerba4.addEventListener('click', function () { //funcion agregarYerba 4
//             acumuladorTotal += valorYerba4;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     const botonTermo1 = document.querySelector(".buttonAddTermoToCart1");
//     const botonTermo2 = document.querySelector(".buttonAddTermoToCart2");
//     const botonTermo3 = document.querySelector(".buttonAddTermoToCart3");
//     const botonTermo4 = document.querySelector(".buttonAddTermoToCart4");
//     const botonTermo5 = document.querySelector(".buttonAddTermoToCart5");
//     const botonTermo6 = document.querySelector(".buttonAddTermoToCart6");

//     if (botonTermo1) {
//         let valorTermo1 = parseFloat(document.querySelector(".termoValue1").dataset.precioTermo1);
//         botonTermo1.addEventListener('click', function () {
//             acumuladorTotal += valorTermo1;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonTermo2) {
//         let valorTermo2 = parseFloat(document.querySelector(".termoValue2").dataset.precioTermo2);
//         botonTermo2.addEventListener('click', function () {
//             acumuladorTotal += valorTermo2;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonTermo3) {
//         let valorTermo3 = parseFloat(document.querySelector(".termoValue3").dataset.precioTermo3);
//         botonTermo3.addEventListener('click', function () {
//             acumuladorTotal += valorTermo3;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonTermo4) {
//         let valorTermo4 = parseFloat(document.querySelector(".termoValue4").dataset.precioTermo4);
//         botonTermo4.addEventListener('click', function () {
//             acumuladorTotal += valorTermo4;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonTermo5) {
//         let valorTermo5 = parseFloat(document.querySelector(".termoValue5").dataset.precioTermo5);
//         botonTermo5.addEventListener('click', function () {
//             acumuladorTotal += valorTermo5;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonTermo6) {
//         let valorTermo6 = parseFloat(document.querySelector(".termoValue6").dataset.precioTermo6);
//         botonTermo6.addEventListener('click', function () {
//             acumuladorTotal += valorTermo6;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     const botonMate1 = document.querySelector(".buttonAddMateToCart1");
//     const botonMate2 = document.querySelector(".buttonAddMateToCart2");
//     const botonMate3 = document.querySelector(".buttonAddMateToCart3");
//     const botonMate4 = document.querySelector(".buttonAddMateToCart4");
//     const botonMate5 = document.querySelector(".buttonAddMateToCart5");

//     if (botonMate1) {
//         let valorMate1 = parseFloat(document.querySelector('.mateValue1').dataset.precioMate1);
//         botonMate1.addEventListener('click', function () {
//             acumuladorTotal += valorMate1;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonMate2) {
//         let valorMate2 = parseFloat(document.querySelector('.mateValue2').dataset.precioMate2);
//         botonMate2.addEventListener('click', function () {
//             acumuladorTotal += valorMate2;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonMate3) {
//         let valorMate3 = parseFloat(document.querySelector('.mateValue3').dataset.precioMate3);
//         botonMate3.addEventListener('click', function () {
//             acumuladorTotal += valorMate3;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonMate4) {
//         let valorMate4 = parseFloat(document.querySelector('.mateValue4').dataset.precioMate4);
//         botonMate4.addEventListener('click', function () {
//             acumuladorTotal += valorMate4;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }

//     if (botonMate5) {
//         let valorMate5 = parseFloat(document.querySelector('.mateValue5').dataset.precioMate5);
//         botonMate5.addEventListener('click', function () {
//             acumuladorTotal += valorMate5;
//             itemsCarrito.innerHTML = (item += 1);
//             totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
//         })
//     }




// });

// let valores = document.querySelectorAll(".itemValue");
// let botones = document.querySelectorAll(".buttonAddToCart");


// function addItemToCart(){
//     itemsCarrito.innerHTML=(item+=1);
//     // totalMiniCarrito.innerHTML+=document.querySelector(".itemValue").innerHTML;
// }

// document.querySelector(".buttonAddToCart").addEventListener("click",addItemToCart);

// botones.forEach(boton => {
//     boton.addEventListener("click",addItemToCart);
// });

