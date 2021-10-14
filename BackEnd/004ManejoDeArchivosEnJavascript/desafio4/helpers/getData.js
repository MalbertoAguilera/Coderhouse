const fs = require("fs");

getData = async (file) => {
  try {
    const res = await fs.promises.readFile(file, "utf-8");
    const data = await JSON.parse(res, null, 2);
    return data;
  } catch (error) {
        console.log("Error de Lectura", error);
  }
};

module.exports = getData;
