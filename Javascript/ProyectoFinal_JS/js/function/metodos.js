class Metodos {

      fetchData() {

            $.getJSON( "./Json/stock.json", data => {
                  this.insertarProductosEnHTML(data);
                  this.getDatosFetch(data);
            })
      }

      cargarListeners() {

            gridProductos.addEventListener("click", evento => {
                  this.agregarAlCarrito(evento);
            })

            footerTabla.addEventListener("click", evento => {
                  this.VaciarCarrito(evento);
                  this.generarPedido(evento);
            })

            itemCarrito.addEventListener('click', evento => {
                  this.accionBotones(evento);
            })

            contenedorIcono.addEventListener('click', evento => {
                  this.togglePanelDetalle(evento);
            })

            contenedorModal.addEventListener('click', evento => {
                  this.resetPagina(evento);
            })

            $('#menuFiltrar li:has(ul)').click( evento => {
                  this.desplegarSubMenu(evento);
            })
      }

      //LocalStorage
      cargarLocalStorage() {

            if (localStorage.getItem('carrito')){
                  carrito = JSON.parse(localStorage.getItem('carrito'));
                  metodo.insertarCarritoEnHTML();
            }
      }

      guardarEnLocalStorage(){
            localStorage.setItem('carrito', JSON.stringify(carrito));
      }
      //FIN LocalStorage


      getDatosFetch(data) {
            datos = data;
      }

      insertarProductosEnHTML(data) {

            gridProductos.innerHTML = "";

            for (const producto of data) {
                  const imagen = templateCard.querySelector('.producto__imagen');
                  imagen.src = pathImagen + producto.thumbnailUrl;
                  imagen.alt = producto.nombre;
                  templateCard.querySelector('.producto__nombre').textContent = producto.nombre;
                  templateCard.querySelector('.producto__precio').textContent = `$${producto.precio}`;
                  templateCard.querySelector('.boton__agregar').dataset.id = producto.id;
                  const clone = templateCard.cloneNode(true);
                  fragment.appendChild(clone);
            }
            gridProductos.appendChild(fragment);
      }

      agregarAlCarrito(evento) {

            if (evento.target.classList.contains("boton__agregar")) {
                  let cardProducto = evento.target.parentElement.parentElement;
                  this.setCarrito(cardProducto);
            }
            evento.stopPropagation();
      }

      setCarrito(cardProducto) {

            const producto = {
                  id: cardProducto.querySelector('.boton__agregar').dataset.id,
                  nombre: cardProducto.querySelector('.producto__nombre').textContent,
                  precio: parseInt(cardProducto.querySelector('.producto__precio').textContent.replace('$', '')),
                  imagen: cardProducto.querySelector('.producto__imagen').src,
                  cantidad: 1
            };

            if (carrito.elementos.hasOwnProperty(producto.id)) {
                  producto.cantidad = carrito.elementos[producto.id].cantidad + 1;
            }
            
            carrito.elementos[producto.id] = {...producto};

            this.mostrarNotificacion(producto, 'agregar');

            this.insertarCarritoEnHTML();
      }

      insertarCarritoEnHTML() {

            itemCarrito.innerHTML = '';

            Object.values(carrito.elementos).forEach(producto => {
                  templateCarrito.querySelector('th img').src = producto.imagen;
                  templateCarrito.querySelector('th img').alt = producto.nombre;
                  templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
                  templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
                  templateCarrito.querySelector('#botonSumar').dataset.id = producto.id;
                  templateCarrito.querySelector('#botonRestar').dataset.id = producto.id;
                  templateCarrito.querySelector('#botonEliminar').dataset.id = producto.id;
                  templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

                  const clone = templateCarrito.cloneNode(true);
                  fragment.appendChild(clone);
            })

            itemCarrito.appendChild(fragment);

            this.insertarFooterTabla();
            this.guardarEnLocalStorage();

            
      }

      insertarFooterTabla() {

            footerTabla.innerHTML = '';
            if (Object.keys(carrito.elementos).length === 0) {
                  footerTabla.innerHTML = `<th colspan = "5" style="text-align:center;">Carrito vacío</th>`

            } else {

                  const arrayCarrito = Object.values(carrito.elementos);
                  const cantidadCarrito = arrayCarrito.reduce((acumulador, {cantidad}) => acumulador + cantidad, 0);
                  const totalCarrito = arrayCarrito.reduce((acumulador, {cantidad, precio}) => acumulador + cantidad * precio, 0);

                  this.mostrarNotificacionCantidadCarritoHTML(cantidadCarrito);

                  templateFooter.querySelectorAll('td')[0].textContent = cantidadCarrito;
                  templateFooter.querySelector('span').textContent = totalCarrito;

                  const clone = templateFooter.cloneNode(true);
                  fragment.appendChild(clone);
                  footerTabla.appendChild(fragment);
            }
      }

      VaciarCarrito(evento) {
            

            if (evento.target.classList.contains("boton__vaciarCarrito")) {
                  evento.preventDefault();
                  carrito.elementos = {};
                  this.borrarNotificacionIconoCarrito();
                  this.insertarCarritoEnHTML();
            }

            evento.stopPropagation();
      }

      generarPedido(evento){

            if(evento.target.classList.contains("boton__FinalizarCompra")){
                  evento.preventDefault();
                  this.mostrarModal();
            }

            evento.stopPropagation();
      }

      mostrarModal(){
            contenedorModal.style.opacity ="1";
            contenedorModal.style.visibility ="visible";
            modal.classList.toggle('close');
      }

      resetPagina(evento){

            console.log(evento.target);

            if(evento.target.classList.contains("finalizar-modal")){
                  carrito.elementos = {};
                  this.borrarNotificacionIconoCarrito();
                  this.insertarCarritoEnHTML();
            }

            evento.stopPropagation();
      }

      accionBotones(evento) {

            evento.preventDefault();
            const botonSeleccionado = evento.target;

            //boton agregar
            if (botonSeleccionado.classList.contains('boton__sumarProducto')) {

                  const productoCarrito = carrito.elementos[evento.target.dataset.id];
                  productoCarrito.cantidad++;
                  this.insertarCarritoEnHTML();
            }

            //boton remover
            if (botonSeleccionado.classList.contains('boton__restarProducto')) {

                  const productoCarrito = carrito.elementos[botonSeleccionado.dataset.id];
                  productoCarrito.cantidad--;

                  if (productoCarrito.cantidad === 0) {
                        this.mostrarNotificacion(productoCarrito, 'remover')
                        this.borrarNotificacionIconoCarrito();
                        delete carrito.elementos[botonSeleccionado.dataset.id];
                  }

                  this.insertarCarritoEnHTML();
            }

            //boton eliminar
            if (botonSeleccionado.classList.contains('boton__eliminar')) {

                  const productoCarrito = carrito.elementos[botonSeleccionado.dataset.id];
                  this.mostrarNotificacion(productoCarrito, 'remover')
                  delete carrito.elementos[botonSeleccionado.dataset.id];

                  if (Object.keys(carrito.elementos).length === 0) {
                        this.borrarNotificacionIconoCarrito();
                  }
                  this.insertarCarritoEnHTML();
            }

            evento.stopPropagation();
      }

      mostrarNotificacionCantidadCarritoHTML(cantidadCarrito) {
            const contadorHTML = document.querySelector('#contador');
            contadorHTML.textContent = cantidadCarrito;
            document.querySelector("#notificacion").classList.add('activado');
      }


      borrarNotificacionIconoCarrito() {
            document.querySelector("#notificacion").classList.remove('activado');
      }

      togglePanelDetalle(evento) {

            if (evento.target.classList.contains('icono')) {
                  $('#contenedorPanelCarrito').slideToggle('slow');
            }

            evento.stopPropagation();
      }

      mostrarNotificacion(producto, tipoNotificacion) {

            const notificacion = this.crearNotificacion(producto, tipoNotificacion);

            contenedorNotificaciones.appendChild(notificacion);

            $(notificacion).animate({
                  opacity: '1'
            }, 1000).delay(1000).animate({
                  opacity: '0'
            }, 1000);

            this.eliminarNotificacion(notificacion);
      }

      crearNotificacion(producto, tipoNotificacion) {

            const notificacion = document.createElement('div');
            const mensaje = document.createElement('span');
            const mensajeNombreProducto = document.createElement('span');

            notificacion.classList.add('notificaciones');

            if (tipoNotificacion == 'agregar') {
                  mensaje.textContent = 'AGREGADO AL CARRITO!';
                  notificacion.classList.add(tipoNotificacion);

            } else {
                  mensaje.textContent = 'ELIMINADO DEL CARRITO!';
                  notificacion.classList.add(tipoNotificacion);
            }

            mensajeNombreProducto.classList.add('notificacionProducto');
            mensajeNombreProducto.textContent = `${producto.nombre}`;

            notificacion.appendChild(mensaje);
            notificacion.appendChild(mensajeNombreProducto);

            return notificacion;
      }

      eliminarNotificacion(notificacion) {

            setTimeout(() => {
                  notificacion.remove();
            }, 3000)
      }

      //MENU FILTRAR
      desplegarSubMenu(evento) {
      
            evento.preventDefault();
            const li = evento.currentTarget;
            //reemplazo de THIS en Jquery, pierdo el contexto
            const opcion = evento.target
            //enlace que despliega el Submenu
      
            if (opcion.classList.contains('subMenu')) {
                  if($(li).hasClass('activado')){
                        $(li).removeClass('activado');
                        $(li).children('ul').slideUp();
                  } else {
                        $('.segundoNivel li ul').slideUp();
                        $('.segundoNivel li').removeClass('activado');
                        $(li).addClass('activado');
                        $(li).children('ul').slideDown();
                  }
      
            }
      
            this.seleccionarFiltro(opcion);
            evento.stopPropagation();
      }

      seleccionarFiltro(opcion){
      
            const ulCategoria = $(opcion).parent().parent();
            $(ulCategoria).find('a').removeClass('activado')
      
            if (opcion.classList.contains('categoria')){
                  metodo.ordenarPorCategoria(opcion.textContent);
                  $(ulCategoria).find('a').removeClass('activado')
                  $(opcion).addClass('activado');
            }
      
            if (opcion.classList.contains('precio')) {
                  $(ulCategoria).find('a').removeClass('activado')
                  $(opcion).addClass('activado');
                  metodo.ordenarPorPrecio(opcion.textContent);
            }
      }

      ordenarPorCategoria(tipo) {

            if (tipo === "Todos") {
                  metodo.insertarProductosEnHTML(datos);
            } else {
                  const arrayCategoria = datos.filter(producto => producto.tipo === tipo.toLowerCase());
                  this.insertarProductosEnHTML(arrayCategoria);
            }

      }

      ordenarPorPrecio(modo) {

            if (modo === "Ascendente") {
                  datos.sort((producto1, producto2) => producto1.precio - producto2.precio);
                  this.insertarProductosEnHTML(datos);
            } else {
                  datos.sort((producto1, producto2) => producto2.precio - producto1.precio);
                  this.insertarProductosEnHTML(datos);
            }

      }

}