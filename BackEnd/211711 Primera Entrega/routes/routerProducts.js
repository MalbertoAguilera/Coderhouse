const express = require("express");
const { Router } = express;
const routerProducts = new Router();
const Contenedor = require("../class/Contenedor");
const filePath = "./db/productos.txt";
const contenedor = new Contenedor(filePath);

routerProducts.get("/:id", async (req, res) => {
  const idItem = parseInt(req.params.id);

  //si no encuentra el id muestra todos
  if ((await contenedor.getById(idItem)) === null)
    return res.json(await contenedor.getAll());

  res.json(await contenedor.getById(idItem));
});

routerProducts.post("/", async (req, res) => {
  if(req.query.admin === "false"){
    res.status(404).json({error: -1, descripcion: `Ruta ${req.originalUrl}, metodo ${req.method} NO AUTORIZADO`});
    return;
  }

  const newItem = {
    ...req.body,
    price: parseFloat(req.body.price),
    thumbnail: "https://picsum.photos/200",
  };
  newItem.id = await contenedor.save(newItem);

  res.json(newItem);
});

routerProducts.put("/:id", async (req, res) => {
  if(req.query.admin === "false"){
    res.status(404).json({error: -1, descripcion: `Ruta ${req.originalUrl}, metodo ${req.method} NO AUTORIZADO`});
    return;
  }
  const idItem = parseInt(req.params.id);

  const editedProperties = {
    ...req.body,
  };

  const editedItem = await contenedor.editById(idItem, editedProperties);

  if (editedItem === null)
    return res.json({ error: "No se encontro el producto" });

  res.json(editedItem);
});

routerProducts.delete("/:id", async (req, res) => {
  if(req.query.admin === "false"){
    res.status(404).json({error: -1, descripcion: `Ruta ${req.originalUrl}, metodo ${req.method} NO AUTORIZADO`});
    return;
  }
  const idItem = parseInt(req.params.id);
  await contenedor.deleteById(idItem);
  res.json({ mensaje: `El item con el ID ${idItem} fue eliminado`});
});

module.exports = routerProducts;
