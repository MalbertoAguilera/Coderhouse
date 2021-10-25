const express = require("express");
const { Router } = express;
const router = new Router();
const Contenedor = require("../class/Contenedor");
const filePath = "./db/productos.txt";

router.get("/", async (req, res) => {
  const contenedor = new Contenedor(filePath);
  res.json(await contenedor.getAll());
});

router.get("/:id", async (req, res) => {
  const contenedor = new Contenedor(filePath);
  const idItem = parseInt(req.params.id);

  if ((await contenedor.getById(idItem)) === null)
    return res.json({ error: "No se encontro el producto" });

  res.json(await contenedor.getById(idItem));
});

router.post("/", (req, res) => {
  const contenedor = new Contenedor(filePath);
  const item = req.body;
  res.send(contenedor.save(item));
});

router.delete("/:id", (req, res) => {
  const contenedor = new Contenedor(filePath);
  const idItem = parseInt(req.params.id);
  contenedor.deleteById(idItem);
  res.json({ mensaje: `El item con el ID ${idItem} fue eliminado` });
});

module.exports = router;
