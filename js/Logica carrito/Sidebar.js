export function renderizarSidebar(){
    const bodySideBar = document.getElementById('sideBarBody');
        bodySideBar.innerHTML = `
            <div class="divHrOffcanvas">
                <hr class="hrOffcanvas">
            </div>
            <div class="divListaProductos"></div>
            <div class="divHrOffcanvas">
                <hr class="hrOffcanvas">
            </div>
            <div class="divSubtotalSidebar d-flex flex-row">
                <h6>Subtotal: $</h6>
                <span class="spanSubtotal"></span>
            </div>
            <div class="divBotonesCarrito">
                ${renderBotonesCarrito(localStorage.getItem('contadorProductos'))} 
            </div>
        `;
}


function renderBotonesCarrito(localStorage) { //Renderizado de los botones por cada producto en el carro siempre y cuando haya productos en el mismo
    let html = "";
    if (localStorage) {
        html += `
        <button class="btn btn-success btn-sm" id="btnPagarCarritoSideBar" style="padding: 5px; color: black;"><a href="https://www.mercadopago.com.ar/" target="_blank" style="color: inherit; text-decoration: none; font-family: Fjalla One;">Ir a pagar</a></button>
        <button class="btn btn-danger btn-sm" id="btnVaciarCarritoSideBar" style="font-family: Fjalla One; padding: 5px; color: black">Vaciar carrito</button>`;
        return html
    }
    return html;
}