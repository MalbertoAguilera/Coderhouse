class CarritoDeCompra {
      constructor() {
            this.elementos = {};
      }
 
      calcularTotal() {
            return this.elementos.map(precio => precio).reduce((total, precio) => total + precio, 0);
      }
}