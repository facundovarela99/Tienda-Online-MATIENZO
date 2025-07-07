let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id, nombre, precio) {
  const producto = carrito.find(item => item.id === id);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarMiniCarrito();
}

function actualizarMiniCarrito() {
  const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById('cantidadCarrito').innerText = cantidad;

  const itemsContainer = document.getElementById('itemsMiniCarrito');
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  document.getElementById('totalMiniCarrito').innerText = total;

  itemsContainer.innerHTML = '';
  carrito.forEach(item => {
    itemsContainer.innerHTML += `<p class="m-0">${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}</p>`;
  });
}

function toggleMiniCarrito() {
  const miniCarrito = document.getElementById('miniCarrito');
  miniCarrito.style.display = miniCarrito.style.display === 'none' ? 'block' : 'none';
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem('carrito');
  actualizarMiniCarrito();
}

actualizarMiniCarrito();