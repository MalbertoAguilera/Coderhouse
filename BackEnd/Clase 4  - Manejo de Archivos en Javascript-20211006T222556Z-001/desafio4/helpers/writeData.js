const writeData = async (fs, file, content) => {
  try {
    await fs.promises.writeFile(file,content);
  } catch (error) {
    console.log("ERROR DE ESCRITURA", error);
  }
};

module.exports = writeData;
