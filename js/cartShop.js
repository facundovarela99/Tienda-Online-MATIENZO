let item=0;
let botones = document.querySelectorAll(".buttonAddToCart");
let itemsCarrito = document.querySelector(".cantidadItemsCarrito");

let totalMiniCarrito = document.querySelector(".totalMiniCarrito");
let valores = document.querySelectorAll(".itemValue");
let acumuladorTotal = 0;

function addItemToCart(){
    itemsCarrito.innerHTML=(item+=1);
    // totalMiniCarrito.innerHTML+=document.querySelector(".itemValue").innerHTML;
}

// document.querySelector(".buttonAddToCart").addEventListener("click",addItemToCart);

botones.forEach(boton => {
    boton.addEventListener("click",addItemToCart);
});

