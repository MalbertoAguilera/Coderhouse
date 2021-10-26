const getData = require("../helpers/getData");
const isInArray = require("../helpers/isInArray");
const writeData = require("../helpers/writeData");

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(item) {
    let data = await this.getAll();
    let quantityOfItems = data.length;

    if (quantityOfItems) {
      let id = data[quantityOfItems - 1].id + 1;

      while (isInArray(id, data)) {
        id++;
      }

      const newArray = [...data, { ...item, id: id }];
      //escribir archivo
      await writeData(this.file, newArray);
      return id;
    }

    const newArray = [{ ...item, id: 1 }];
    await writeData(this.file, newArray);
    return 1;
  }

  async getById(id) {
    let data = await this.getAll();

    if (isInArray(id, data)) {
      const itemFound = data.find((item) => item.id === id);
      return itemFound;
    }

    return null;
  }

  async getAll() {
    return await getData(this.file);
  }

  async deleteById(id) {
    let data = await this.getAll();

    if (isInArray(id, data)) {
      const arrayFiltered = data.filter((item) => item.id !== id);
      await writeData(this.file, arrayFiltered);
      return;
    }

    console.log(`El item con el ID: ${id}, NO EXISTE EN LA COLECCION!`);
  }

  async deleteAll() {
    await writeData(this.file, []);
    return;
  }

  async editById(id, editedProperties){

    let data = await this.getAll();
    const index = data.findIndex(item => item.id === id);

    if(index===-1)
      return null

    data[index] = {
      ...data[index],
      ...editedProperties
    }

    await writeData(this.file, data);
    return data[index];
  }
}

module.exports = Contenedor;