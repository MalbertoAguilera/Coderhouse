document.addEventListener('DOMContentLoaded', () => {
      productos = metodo.cargarInventario();
      metodo.insertarProductosEnHTML(productos);
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