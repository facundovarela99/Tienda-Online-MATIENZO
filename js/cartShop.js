document.addEventListener('DOMContentLoaded', function () {

    let item = 0;
    let itemsCarrito = document.querySelector(".cantidadItemsCarrito");
    let totalMiniCarrito = document.querySelector(".totalMiniCarrito");
    let acumuladorTotal = 0;

    const botonYerba1 = document.querySelector(".buttonAddYerbaToCart1");
    const botonYerba2 = document.querySelector(".buttonAddYerbaToCart2");
    const botonYerba3 = document.querySelector(".buttonAddYerbaToCart3");
    const botonYerba4 = document.querySelector(".buttonAddYerbaToCart4");

    if (botonYerba1) {
        let valorYerba1 = parseFloat(document.querySelector(".yerbaValue1").dataset.precioYerba1);
        botonYerba1.addEventListener('click', function () { //funcion agregarYerba1
            acumuladorTotal += valorYerba1;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    if (botonYerba2) {
        let valorYerba2 = parseFloat(document.querySelector(".yerbaValue2").dataset.precioYerba2);
        botonYerba2.addEventListener('click', function () { //funcion agregarYerba2
            acumuladorTotal += valorYerba2;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    if (botonYerba3) {
        let valorYerba3 = parseFloat(document.querySelector(".yerbaValue3").dataset.precioYerba3);
        botonYerba3.addEventListener('click', function () { //function agregarYerba3
            acumuladorTotal += valorYerba3;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    if (botonYerba4) {
        let valorYerba4 = parseFloat(document.querySelector(".yerbaValue4").dataset.precioYerba4);
        botonYerba4.addEventListener('click', function () { //funcion agregarYerba 4
            acumuladorTotal += valorYerba4;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    const botonTermo1 = document.querySelector(".buttonAddTermoToCart1");
    const botonTermo2 = document.querySelector(".buttonAddTermoToCart2");
    const botonTermo3 = document.querySelector(".buttonAddTermoToCart3");
    const botonTermo4 = document.querySelector(".buttonAddTermoToCart4");
    const botonTermo5 = document.querySelector(".buttonAddTermoToCart5");
    const botonTermo6 = document.querySelector(".buttonAddTermoToCart6");

    if (botonTermo1) {
        let valorTermo1 = parseFloat(document.querySelector(".termoValue1").dataset.precioTermo1);
        botonTermo1.addEventListener('click', function () {
            acumuladorTotal += valorTermo1;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    if (botonTermo2) {
        let valorTermo2 = parseFloat(document.querySelector(".termoValue2").dataset.precioTermo2);
        botonTermo2.addEventListener('click', function () {
            acumuladorTotal += valorTermo2;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    if (botonTermo3) {
        let valorTermo3 = parseFloat(document.querySelector(".termoValue3").dataset.precioTermo3);
        botonTermo3.addEventListener('click', function () {
            acumuladorTotal += valorTermo3;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    if (botonTermo4) {
        let valorTermo4 = parseFloat(document.querySelector(".termoValue4").dataset.precioTermo4);
        botonTermo4.addEventListener('click', function () {
            acumuladorTotal += valorTermo4;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    if (botonTermo5) {
        let valorTermo5 = parseFloat(document.querySelector(".termoValue5").dataset.precioTermo5);
        botonTermo5.addEventListener('click', function () {
            acumuladorTotal += valorTermo5;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    if (botonTermo6) {
        let valorTermo6 = parseFloat(document.querySelector(".termoValue6").dataset.precioTermo6);
        botonTermo6.addEventListener('click', function () {
            acumuladorTotal += valorTermo6;
            itemsCarrito.innerHTML = (item += 1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }

    const botonMate1 = document.querySelector(".buttonAddMateToCart1");
    const botonMate2 = document.querySelector(".buttonAddMateToCart2");
    const botonMate3 = document.querySelector(".buttonAddMateToCart3");
    const botonMate4 = document.querySelector(".buttonAddMateToCart4");
    const botonMate5 = document.querySelector(".buttonAddMateToCart5");

    if (botonMate1){
        let valorMate1 = parseFloat(document.querySelector('.mateValue1').dataset.precioMate1);
        botonMate1.addEventListener('click', function(){
            acumuladorTotal+= valorMate1;
            itemsCarrito.innerHTML = (item+=1);
            totalMiniCarrito.innerHTML = `${acumuladorTotal}`;
        })
    }


});

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

