class Metodos {

      cargarInventario() {

            const listadoDeProductos = [];
            listadoDeProductos.push(new Producto("1", "Cerveza Quilmes Clasica 473ml lata", "cerveza", 58, 5, "cerveza-quilmes-clasica-473.png"));
            listadoDeProductos.push(new Producto("2", "Cerveza Quilmes Bock 473ml lata", "cerveza", 58, 7, "cerveza-quilmes-bock-473.png"));
            listadoDeProductos.push(new Producto("3", "Cerveza Quilmes Stout 473ml lata", "cerveza", 58, 2, "cerveza-quilmes-stout-473.png"));
            listadoDeProductos.push(new Producto("4", "Cerveza Quilmes 1890 473ml lata", "vino", 58, 5, "cerveza-quilmes-1890-473.png"));
            listadoDeProductos.push(new Producto("5", "Gaseosa Mirinda Naranja 1500ml", "gaseosa", 68, 12, "gaseosa-mirinda-naranja-pet-1500.png"));
            listadoDeProductos.push(new Producto("6", "Gaseosa 7up 1500ml", "gaseosa", 88, 10, "gaseosa-7up-pet-2250.png"));
            listadoDeProductos.push(new Producto("7", "Gaseosa Pepsi Pet 2250ml", "gaseosa", 119, 7, "gaseosa-pepsi-pet-2250.png"));
            listadoDeProductos.push(new Producto("8", "Vino Capriccio Dolcezza 750 ml - Blanco", "vino", 168, 20, "vino-capriccio-dolcezza-dulce-natural-750.png"));
            listadoDeProductos.push(new Producto("9", "Vino Novecento Raices 750 ml - Tinto Malbec", "vino", 220, 20, "vino-novecento-raices-malbec-750.png"));
            listadoDeProductos.push(new Producto("10", "Vino Dante Robino Malbec 750 ml", "vino", 270, 20, "vino-dante-robino-malbec-750.png"));
            return listadoDeProductos;
      }

      insertarProductosEnHTML(productos) {
            for (const producto of productos) {
                  const imagen = templateCard.querySelector('.producto__imagen');
                  imagen.src = pathImagen + producto.enlace;
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
                        // delete productoCarrito;  GENERA ERROR
                        delete carrito.elementos[evento.target.dataset.id];
                  }
                  this.insertarCarritoEnHTML();
            }
            evento.stopPropagation();   
      }

}