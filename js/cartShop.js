let item=0;
let botones = document.querySelectorAll(".buttonAddToCart");
let itemsCarrito = document.querySelector(".cantidadItemsCarrito");

function addItemToCart(){
    itemsCarrito.innerHTML=(item+=1);
}

document.querySelector(".buttonAddToCart").addEventListener("click",addItemToCart);

botones.forEach(boton => {
    boton.addEventListener("click",addItemToCart);
});