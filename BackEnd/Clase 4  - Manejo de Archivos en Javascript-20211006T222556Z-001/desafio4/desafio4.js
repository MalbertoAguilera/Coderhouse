const fs = require("fs");
const getData = require("./helpers/getData");
const isInArray = require("./helpers/isInArray");
const writeData = require("./helpers/writeData");

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
      await writeData(fs, this.file, JSON.stringify(newArray, null, 2));
      return id;
    }

    const newArray = [{ ...item, id: 1 }];
    await writeData(fs, this.file, JSON.stringify(newArray, null, 2));
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
    return await getData(fs, this.file);
  }

  async deleteById(id) {
    let data = await this.getAll();

    if (isInArray(id, data)) {
      const arrayFiltered = data.filter((item) => item.id !== id);
      await writeData(fs, this.file, JSON.stringify(arrayFiltered, null, 2));
    } else {
      console.log(`El item con el ID: ${id}, NO EXISTE EN LA COLECCION!`);
    }
    return;
  }

  async deleteAll() {
    await writeData(fs, this.file, "[]");
  }
}

const app = async () => {
  const contenedor = new Contenedor("./desafio4/productos.txt");
  const testObject = {
    title: "testObject",
    price: 100,
    thumbnail: "https://cdn3.iconfinder.com/data...",
  };

  console.log("EJECUCION getAll()\n", await contenedor.getAll());
  
  for (let i = 0; i < 10; i++)
    console.log("EJECUCION save(item)\nID:", await contenedor.save(testObject));
  
  console.log("EJECUCION getAll()\n", await contenedor.getAll());
  
  for (let i = 0; i < 5; i++) 
    await contenedor.deleteById(i+1);
  
  console.log("EJECUCION getAll() al eliminar los primeros 6 elementos\n", await contenedor.getAll());
  
  for (let i = 0; i < 10; i++) 
    console.log("EJECUCION getById(id)\n", await contenedor.getById(i+1));
  

  console.log("EJECUCION deleteAll()\n", await contenedor.deleteAll());
  console.log("EJECUCION getAll()\n", await contenedor.getAll());
  
  for (let i = 0; i < 10; i++)
    console.log("EJECUCION save(item)\nID:", await contenedor.save(testObject));
  
  console.log("EJECUCION getAll()\n", await contenedor.getAll());
};

app();
