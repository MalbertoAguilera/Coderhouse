class Producto {

      constructor(id = "", nombre = "", tipo = "", precio = 0, cantidad = "", enlace) {
            this.id = id;
            this.nombre = nombre;
            this.tipo = tipo;
            this.precio = precio;
            this.cantidad = cantidad;
            this.enlace = enlace;

      }
      existeStock() {
            return this.cantidad > 0;
      }
      actualizarStock() {
            --this.cantidad;
      }
};