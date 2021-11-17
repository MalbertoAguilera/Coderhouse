const express = require("express");
const { Router } = express;
const routerProducts = new Router();
const Contenedor = require("../class/Contenedor");
const filePath = "./db/productos.txt";

const contenedor = new Contenedor(filePath);

routerProducts.get("/", async (req, res) => {
  res.json(await contenedor.getAll());
});

routerProducts.get("/:id", async (req, res) => {
  const idItem = parseInt(req.params.id);

  if ((await contenedor.getById(idItem)) === null)
    return res.json({ error: "No se encontro el producto" });

  res.json(await contenedor.getById(idItem));
});

routerProducts.post("/", async (req, res) => {
  const newItem = {
    ...req.body,
    price: parseFloat(req.body.price),
    thumbnail: "https://picsum.photos/200"
  };
  newItem.id = await contenedor.save(newItem);
  res.json(newItem);
});

routerProducts.put("/:id", async(req, res) => {
  const idItem = parseInt(req.params.id);

  const editedProperties = {
    ...req.body,
  };

  const response = await contenedor.editById(idItem, editedProperties);

  if (response === null)
    return res.json({ error: "No se encontro el producto" });

  res.send(response);
  

});

routerProducts.delete("/:id", (req, res) => {
  const idItem = parseInt(req.params.id);
  contenedor.deleteById(idItem);
  res.json({ mensaje: `El item con el ID ${idItem} fue eliminado` });
});

module.exports = routerProducts;