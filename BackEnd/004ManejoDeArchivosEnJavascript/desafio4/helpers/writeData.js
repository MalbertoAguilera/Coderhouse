const fs = require("fs");

const writeData = async (file, data) => {
  try {
    await fs.promises.writeFile(file, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log("ERROR DE ESCRITURA", error);
  }
};

module.exports = writeData;
