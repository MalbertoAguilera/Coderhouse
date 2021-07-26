//punteros a document
const gridProductos = document.querySelector('.gridProductos');
const itemCarrito = document.querySelector('#itemCarrito');
const footerTabla = document.querySelector('#footerTabla');
const iconoCarrito = document.querySelector('#contenedorIcono');
const contenedorNotificaciones = document.querySelector('#contenedorNotificaciones');
//punteros a template
const templateCard = document.querySelector('#templateCard').content;
const templateCarrito = document.querySelector('#templateCarrito').content;
const templateFooter = document.querySelector('#templateFooter').content;
const fragment = document.createDocumentFragment();
//ruta imagenes
const pathImagen = "./assets/img/"

const metodo = new Metodos();
let carrito = new CarritoDeCompra();
let productos;
let datos;