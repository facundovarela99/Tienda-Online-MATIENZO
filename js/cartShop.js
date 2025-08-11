let item = 0;
let itemsCarrito = document.querySelector(".cantidadItemsCarrito");
let totalMiniCarrito = document.querySelector(".totalMiniCarrito");
let acumuladorTotal = 0;
let valorYerba1 = parseFloat(document.querySelector(".itemValue1").dataset.precioYerba1);
let valorYerba2 = parseFloat(document.querySelector(".itemValue2").dataset.precioYerba2);
let valorYerba3 = parseFloat(document.querySelector(".itemValue3").dataset.precioYerba3);
let valorYerba4 = parseFloat(document.querySelector(".itemValue4").dataset.precioYerba4);

function agregarYerba1(){
    acumuladorTotal+=valorYerba1;
    itemsCarrito.innerHTML=(item+=1);
    totalMiniCarrito.innerHTML=`${acumuladorTotal}`;
}
function agregarYerba2(){
    acumuladorTotal+=valorYerba2;
    itemsCarrito.innerHTML=(item+=1);
    totalMiniCarrito.innerHTML=`${acumuladorTotal}`;
}
function agregarYerba3(){
    acumuladorTotal+=valorYerba3;
    itemsCarrito.innerHTML=(item+=1);
    totalMiniCarrito.innerHTML=`${acumuladorTotal}`;
}
function agregarYerba4(){
    acumuladorTotal+=valorYerba4;
    itemsCarrito.innerHTML=(item+=1);
    totalMiniCarrito.innerHTML=`${acumuladorTotal}`;
}

document.querySelector(".buttonAddToCart1").addEventListener("click",agregarYerba1);
document.querySelector(".buttonAddToCart2").addEventListener("click",agregarYerba2);
document.querySelector(".buttonAddToCart3").addEventListener("click",agregarYerba3);
document.querySelector(".buttonAddToCart4").addEventListener("click",agregarYerba4);














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

