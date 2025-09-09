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

let contadorElementosCarrito = document.querySelector('.cantidadItemsCarrito');
let subTotalCarrito = document.querySelector('.totalMiniCarrito');
let subTotal = 0;

(localStorage.getItem('contadorProductos')===null)
? contadorElementosCarrito.innerHTML = 0
: contadorElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');

(localStorage.getItem('subTotalProductos') ===  null)
? subTotalCarrito.innerHTML = 0
: subTotalCarrito.innerHTML = localStorage.getItem('subTotalProductos');

function renderDescripcion(array){
    let html = "";
    for (let i = 0; i < array.length; i++) {
        if(i===0){
            html+=`<p class="fs-2 fw-bolder">${array[i]}</p>`
        }
        html+=`<p class="fs-2 fw-bolder">${array[i]}</p>`
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
            <p class="fs-5 fw-normal ps-5">$ ${producto.precio},00</p>
            <p class="fs-5 fw-normal ps-5">${producto.cuotas}</p>
            <button class="button btn btn-dark btnComprar${producto.id}" data-name="${producto.nombre}" data-id="${producto.id}" data-precio="${producto.precio}" data-img="${producto.imagen}">Agregar al
              carrito</button>
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
        let carrito;
        if (localStorage.getItem('carrito') === null) {
            carrito = [];
        } else {
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }
        let mate = {
            'id':idMate,
            'nombre':nombreMate,
            'precio':precioMate,
            'imagen':imagenMate
        }
        carrito.push(mate);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        let productosAlmacenados = contadorElementosCarrito.textContent;
        productosAlmacenados++;
        (localStorage.getItem('subTotalProductos') === null)
        ? subTotal+=parseInt(precioMate)
        : subTotal = parseInt(precioMate)+ Number(localStorage.getItem('subTotalProductos'))
        localStorage.setItem('contadorProductos', Number(productosAlmacenados));
        localStorage.setItem('subTotalProductos', Number(subTotal));
        contadorElementosCarrito.innerHTML = localStorage.getItem('contadorProductos');
        subTotalCarrito.innerHTML = localStorage.getItem('subTotalProductos');
    })
}


const sidebarButton = document.getElementById('sidebarButton');
sidebarButton.addEventListener('click',()=>{
    const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    const contenedorBodySidebar = document.querySelector('.divListaProductos');
    contenedorBodySidebar.innerHTML = '';

    carrito.forEach((producto)=>{
        const etiquetaProductoEnCarrito = document.createElement('div');
        etiquetaProductoEnCarrito.className = 'mateCarrito';
        etiquetaProductoEnCarrito.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="140">
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">${producto.nombre}</h6>
            <h6 style="font-family: Fjalla One; font-size: 1.5rem;">$${producto.precio}</h6>
        `;
        contenedorBodySidebar.appendChild(etiquetaProductoEnCarrito);
        document.querySelector('.spanSubtotal').innerHTML = localStorage.getItem('subTotalProductos');
    })
})


const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');
function vaciarCarrito() {
    localStorage.removeItem('carrito')
    localStorage.removeItem('contadorProductos');
    localStorage.removeItem('subTotalProductos');
    contadorElementosCarrito.innerHTML = 0;
    subTotalYerbas.innerHTML = 0;
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


mostrarMates();