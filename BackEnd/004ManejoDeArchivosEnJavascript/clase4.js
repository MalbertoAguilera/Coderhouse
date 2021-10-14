const fs = require("fs");

const fechaYhora = new Date();


// Eliminar
try {
    // Escribir
    fs.writeFileSync("./fyh.txt", JSON.stringify(fechaYhora), { encoding: "utf-8" });
} catch (err) {
    throw new  Error("Error al crear el archivo:")    
}

// Leer archivo
let readFileOne = fs.readFileSync("./fyh.txt", { encoding: "utf-8" });
console.log(readFileOne);
