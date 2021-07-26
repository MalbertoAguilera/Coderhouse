class Metodos {

      async fetchData() {
            try {
                  const res = await fetch('./Json/stock.json');
                  const data = await res.json();
                  this.insertarProductosEnHTML(data);
            } catch (error) {
                  console.log(error);
            }

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
            //gonza fijate esto
            this.obtenerArrayData(data);
      }

      obtenerArrayData(data) {
            if (datos === undefined)
                  datos = data;
      }

      agregarAlCarrito(evento) {
            //event delegation, para evitar la escucha de todos los elementos
            if (evento.target.classList.contains("boton__agregar")) {
                  let cardProducto = evento.target.parentElement.parentElement;
                  this.setCarrito(cardProducto);
            }
            evento.stopPropagation();
      }

      setCarrito(cardProducto) {
            //construyo el objeto desde la info de la card para agregar al carrito
            const producto = {
                  id: cardProducto.querySelector('.boton__agregar').dataset.id,
                  nombre: cardProducto.querySelector('.producto__nombre').textContent,
                  precio: parseInt(cardProducto.querySelector('.producto__precio').textContent.replace('$', '')),
                  cantidad: 1
            };

            //si existe el producto en carrito, actualizo cantidad
            if (carrito.elementos.hasOwnProperty(producto.id)) {
                  producto.cantidad = carrito.elementos[producto.id].cantidad + 1;
            }
            //coleccion de objetos indexados (Objeto de objetos)
            carrito.elementos[producto.id] = {
                  ...producto
            };

            this.mostrarNotificacion(producto, 'agregar');
            this.insertarCarritoEnHTML();
      }

      insertarCarritoEnHTML() {
            //inicializar vacio para no acumular items anteriores
            itemCarrito.innerHTML = '';
            //Object.Value transforma la coleccion de objetos indexados en un array de Objetos tipo producto
            Object.values(carrito.elementos).forEach(producto => {
                  templateCarrito.querySelector('th').textContent = producto.id;
                  templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
                  templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
                  templateCarrito.querySelector('#botonSumar').dataset.id = producto.id;
                  templateCarrito.querySelector('#botonRestar').dataset.id = producto.id;
                  templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

                  const clone = templateCarrito.cloneNode(true);
                  fragment.appendChild(clone);
            })
            itemCarrito.appendChild(fragment);

            this.insertarFooterTabla();

            localStorage.setItem('carrito', JSON.stringify(carrito));
      }

      insertarFooterTabla() {

            footerTabla.innerHTML = '';
            if (Object.keys(carrito.elementos).length === 0) {
                  footerTabla.innerHTML = `<th colspan = "5" style="text-align:center;">Carrito vacío</th>`
            } else {


                  const arrayCarrito = Object.values(carrito.elementos);
                  const cantidadCarrito = arrayCarrito.reduce((acumulador, {
                        cantidad
                  }) => acumulador + cantidad, 0);
                  const totalCarrito = arrayCarrito.reduce((acumulador, {
                        cantidad,
                        precio
                  }) => acumulador + cantidad * precio, 0);

                  this.mostrarCantidadEnCarritoHTML(cantidadCarrito);

                  templateFooter.querySelectorAll('td')[0].textContent = cantidadCarrito;
                  templateFooter.querySelector('span').textContent = totalCarrito;

                  const clone = templateFooter.cloneNode(true);
                  fragment.appendChild(clone);
                  footerTabla.appendChild(fragment);

                  //Recien en este punto se puede apuntar al boton vaciar
                  //al menos que lo defina en la estructura inicial y desactivarlo con CSS
                  // const botonVaciar = document.querySelector('#vaciarCarrito');
                  // botonVaciar.addEventListener('click', () => {
                  //       carrito.elementos = {};
                  //       this.insertarCarritoEnHTML();
                  // })
            }
      }


      //OBSERVACION: sI SE REALIZA CLICK EN CUALQUIER LUGAR DE LA TABLA CARRITO LAS FUNCIONES SE ACTIVAN
      //NO ES PERFORMANTE
      //posible solucion a vaciar el carrito
      botonVaciar(evento) {
            if (evento.target.classList.contains("boton__vaciarCarrito")) {
                  carrito.elementos = {};
                  this.borrarNotificacionIconoCarrito();
                  this.insertarCarritoEnHTML();
            }
            evento.stopPropagation();
      }

      aumentarDisminuirCantidad(evento) {
            if (evento.target.classList.contains('boton__sumarProducto')) {
                  //se localiza producto a traves del indice del boton
                  const productoCarrito = carrito.elementos[evento.target.dataset.id];
                  productoCarrito.cantidad++;
                  this.insertarCarritoEnHTML();
            }

            if (evento.target.classList.contains('boton__restarProducto')) {
                  //se localiza producto a traves del indice del boton
                  const productoCarrito = carrito.elementos[evento.target.dataset.id];
                  productoCarrito.cantidad--;
                  if (productoCarrito.cantidad === 0) {
                        this.mostrarNotificacion(productoCarrito, 'remover')
                        delete carrito.elementos[evento.target.dataset.id];
                        this.borrarNotificacionIconoCarrito();
                  }
                  this.insertarCarritoEnHTML();
            }
            evento.stopPropagation();
      }

      mostrarCantidadEnCarritoHTML(cantidadCarrito) {
            const contadorHTML = document.querySelector('#contador');
            contadorHTML.textContent = cantidadCarrito;
            document.querySelector("#notificacion").classList.add('activado');
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

      borrarNotificacionIconoCarrito() {
            document.querySelector("#notificacion").classList.remove('activado');
      }

      togglePanelDetalle(evento) {

            if (evento.target.classList.contains('icono')) {
                  const detalleDeCompra = document.querySelector('#tablaCarrito');
                  detalleDeCompra.classList.toggle('activado');
            }
      }

      mostrarNotificacion(producto, tipoNotificacion) {

            const notificacion = this.crearNotificacion(producto, tipoNotificacion);

            contenedorNotificaciones.appendChild(notificacion);

            $(notificacion).animate({
                  opacity: '1'
            },1000).delay(1000).animate({
                  opacity:'0'
            },1000);

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
            }, 4000)
      }

}