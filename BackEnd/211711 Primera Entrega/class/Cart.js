const getData = require("../helpers/getData");
const writeData = require("../helpers/writeData");
const isInArray = require("../helpers/isInArray");
const moment = require("moment");
const now = moment().format("DD/MM/YYYY HH:mm:ss");

class Cart {
  constructor(filePath) {
    this.file = filePath;
  }

  async save(cart) {
      let data = await this.getAll();
      let quantityOfItems = data.length;
  
      if (quantityOfItems) {
        let id = data[quantityOfItems - 1].id + 1;
  
        while (isInArray(id, data)) {
          id++;
        }
  
        const arrCart = [...data, {id, timeStamp:now, ...cart}];

        console.log(arrCart);
        //escribir archivo
        await writeData(this.file, arrCart);
        return id;
      }
  
      const newCart = [{id:1, timeStamp:now, products:[], ...cart}];
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
        return itemFound;
      }
  
      return null;
    }
}

module.exports = Cart;