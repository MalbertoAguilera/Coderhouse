document.addEventListener('DOMContentLoaded', () => {

      metodo.fetchData();
      if (localStorage.getItem('carrito')){
            carrito = JSON.parse(localStorage.getItem('carrito'));
            metodo.insertarCarritoEnHTML();
      }
})

gridProductos.addEventListener("click", evento => {
      metodo.agregarAlCarrito(evento);
})

footerTabla.addEventListener("click", evento => {
      metodo.botonVaciar(evento);
})

itemCarrito.addEventListener('click', evento => {
      metodo.aumentarDisminuirCantidad(evento);
})