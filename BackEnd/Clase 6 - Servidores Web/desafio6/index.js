const express = require('express');
const Contenedor = require('./class/Contenedor');
const getRandomItem = require('./helpers/getRandomItem');

const contenedor = new Contenedor("./db/productos.txt");
const app = express();

const PORT = 3000 || process.env.PORT;

app.get('/', async (req,res) => {
      res.send(await contenedor.getAll());
});

app.get('/productoRandom', async (req,res) => {
      res.send(getRandomItem(await contenedor.getAll()));
})
const server = app.listen(PORT, () => {
      console.log(`El servidor se encuentra escuchando por el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));
