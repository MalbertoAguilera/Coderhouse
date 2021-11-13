const getData = require("../helpers/getData");
const writeData = require("../helpers/writeData");
const isInArray = require("../helpers/isInArray");
const moment = require("moment");
const now = moment().format("DD/MM/YYYY HH:mm:ss");

class Message {
  constructor(filePath) {
    this.file = filePath;
  }

  async getAllMessages() {
    return await getData(this.file);
  }

  async save(message) {
      let data = await this.getAllMessages();
      let quantityOfItems = data.length;
  
      if (quantityOfItems) {
        let id = data[quantityOfItems - 1].id + 1;
  
        while (isInArray(id, data)) {
          id++;
        }
  
        const newArray = [...data, { ...message, id: id, date:now }];
        //escribir archivo
        await writeData(this.file, newArray);
        return id;
      }
  
      const newArray = [{ ...message, id: 1, date:now }];
      await writeData(this.file, newArray);
      return 1;
    }
}

module.exports = Message;
