const getData = require("../helpers/getData");
const writeData = require("../helpers/writeData");
const isInArray = require("../helpers/isInArray");
const moment = require("moment");
const now = moment().format("DD/MM/YYYY HH:mm:ss");

class Cart {
  constructor(filePath) {
    this.file = filePath;
  }

  async create() {
    let data = await this.getAll();
    let quantityOfItems = data.length;

    if (quantityOfItems) {
      let id = data[quantityOfItems - 1].id + 1;

      while (isInArray(id, data)) {
        id++;
      }

      const updatedArrCarts = [...data, { id, timeStamp: now, products: [] }];

      console.log(updatedArrCarts);
      //escribir archivo
      await writeData(this.file, updatedArrCarts);
      return id;
    }

    const newCart = [{ id: 1, timeStamp: now, products: [] }];
    console.log(newCart);

    await writeData(this.file, newCart);
    return 1;
  }

  async getAll() {
    return await getData(this.file);
  }

  async getById(id) {
    let data = await this.getAll();

    if (isInArray(id, data)) {
      const itemFound = data.find((item) => item.id === id);
      return itemFound.products;
    }

    return null;
  }

  async deleteById(id) {
    let data = await this.getAll();

    if (isInArray(id, data)) {
      const arrayFiltered = data.filter((item) => item.id !== id);
      await writeData(this.file, arrayFiltered);
      console.log(`El carrito con el ID: ${id}, FUE ELIMINADO CON EXITO`);
      return id;
    }

    console.log(`El item con el ID: ${id}, NO EXISTE EN LA COLECCION!`);
    return null;
  }

  async addProducts(id, arrProducts) {
    let data = await this.getAll();

    if (!isInArray(id, data)) {
      return null;
    }

    let index = data.findIndex((cart) => cart.id === id);

    data[index].products = [
        ...data[index].products,
        ...arrProducts
    ]

    await writeData(this.file, data);
    return data[index].id;
  }

  async deleteProduct(idCart, idProduct){
    const data = await this.getAll();

    if (!isInArray(idCart, data)) {
      return null;
    }

    let indexCart = data.findIndex((cart) => cart.id === idCart);

    const arrProductsModified = data[indexCart].products.filter(item => item.id !== idProduct);

    console.log(arrProductsModified);

    data[indexCart] = {...data[indexCart], products : arrProductsModified};

    await writeData(this.file, data);
    return data[indexCart].id;

  }
}

module.exports = Cart;
