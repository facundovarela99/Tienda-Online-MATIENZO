const url = "../js/data.json";

fetch(url)
    .then(res => res.json())
    .then(data => mostrarBombillas(data.bombillas))
    .catch(err => console.error("Error cargando JSON:", err));

let contadorElementosCarrito = document.querySelector('.cantidadItemsCarrito');
let subTotalCarrito = document.querySelector('.totalMiniCarrito');
let subTotal = 0;

function validarStorage(storage) {
    if (storage) {
        return storage;
    } else {
        return 0;
    }
}

contadorElementosCarrito.innerHTML = validarStorage(localStorage.getItem('contadorProductos'));
subTotalCarrito.innerHTML = validarStorage(localStorage.getItem('subTotalProductos'));

const contenedorBombillas = document.querySelector('.contenedorBombillas');

function renderDescripcion(array) {
    let html = "";
    for (let index = 0; index < array.length; index++) {
        if (index === 0) {
            html += `<p class="fs-2 fw-normal ps-5">${array[index]}</p>`
        } else {
            html += `<p class="fs-4 fw-normal ps-5">${array[index]}</p>`
        }
    }
    return html
}

function mostrarBombillas(bombillas) {
    bombillas.forEach((bombilla) => {
        const divPadre = document.createElement('div');
        (bombilla.id % 2 === 0)
            ? divPadre.className = `bombilla w-100 d-flex flex-column align-items-start ps-5 py-5`
            : divPadre.className = `bombilla w-100 d-flex flex-column align-items-end pe-5 py-5`

        divPadre.innerHTML = `
            <div class="fila d-flex flex-row w-50" data-aos="fade-right">
            <div class="imagen w-50">
                <a href="../pages/contacto.html">
                <img src="${bombilla.imagen}" alt="${bombilla.nombre}">
                </a>
            </div>
            <div class="parrafos d-flex flex-column ps-3">
                <p class="fs-2 fw-bolder" id="itemName">${bombilla.nombre}</p>
                ${renderDescripcion(bombilla.descripcion)}
                <p class="fs-5 fw-normal ps-5 itemValue">$${bombilla.precio}</p>
                <p class="fs-5 fw-normal ps-5">${bombilla.cuotas}</p>
                <button class="button btn btn-dark btnComprar${bombilla.id}" data-id="${bombilla.id}" data-nombre="${bombilla.nombre}" data-precio="${bombilla.precio}" data-imagen="${bombilla.imagen}">Agregar al
                carrito</button>
            </div>
            </div>
        `;
        contenedorBombillas.appendChild(divPadre);

        const btnComprar = document.querySelector(`.btnComprar${bombilla.id}`);
        btnComprar.addEventListener('click', () => {
            const idBombilla = btnComprar.getAttribute('data-id');
            const nombreBombilla = btnComprar.getAttribute('data-nombre');
            const precioBombilla = btnComprar.getAttribute('data-precio');
            const imagenBombilla = btnComprar.getAttribute('data-imagen');

            let carrito;

            (localStorage.getItem('carrito') === null)
                ? carrito = []
                : carrito = JSON.parse(localStorage.getItem('carrito'));

            let nuevoProducto = {
                "id": idBombilla,
                "nombre": nombreBombilla,
                "precio": precioBombilla,
                "imagen": imagenBombilla
            }

            carrito.push(nuevoProducto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            (localStorage.getItem('subTotalProductos') === null)
                ? subTotal += parseInt(precioBombilla)
                : subTotal = parseInt(precioBombilla) + Number(localStorage.getItem('subTotalProductos'));
            localStorage.setItem('subTotalProductos', Number(subTotal))
            subTotalCarrito.innerHTML = subTotal;
            let productosAlmacenados;
            productosAlmacenados = validarStorage(localStorage.getItem('contadorProductos'));
            productosAlmacenados++;
            localStorage.setItem('contadorProductos', Number(productosAlmacenados));
            contadorElementosCarrito.innerHTML = productosAlmacenados;
        });
    });
};

const contenedorBodySidebar = document.querySelector('.divListaProductos');
const botonSideBar = document.getElementById('sidebarButton');

botonSideBar.addEventListener('click', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    contenedorBodySidebar.innerHTML = "";
    carrito.forEach((producto) => {
        const etiquetaProductoEnCarrito = document.createElement('div');
        etiquetaProductoEnCarrito.className = 'bombillaCarrito';
        etiquetaProductoEnCarrito.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="140">
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">${producto.nombre}</h6>
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">$${producto.precio}</h6>
        `;
        contenedorBodySidebar.appendChild(etiquetaProductoEnCarrito);
        document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos');
    });
});

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

