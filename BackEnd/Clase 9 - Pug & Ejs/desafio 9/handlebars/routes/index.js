const express = require("express");
const { Router } = express;
const router = new Router();
const Contenedor = require("../class/Contenedor");
const filePath = "./db/productos.txt";

const contenedor = new Contenedor(filePath);

router.get("/", async (req, res) => {
  res.render("products",{data:await contenedor.getAll()})
});

router.get("/:id", async (req, res) => {
  const idItem = parseInt(req.params.id);

  if ((await contenedor.getById(idItem)) === null)
    return res.json({ error: "No se encontro el producto" });

  res.json(await contenedor.getById(idItem));
});

router.post("/", async (req, res) => {
  const newItem = {
    ...req.body,
    price: parseFloat(req.body.price),
    thumbnail: "https://picsum.photos/200"
  };
  await contenedor.save(newItem);
  res.redirect('/productos')
});

router.put("/:id", async(req, res) => {
  const idItem = parseInt(req.params.id);

  const editedProperties = {
    ...req.body,
  };

  const response = await contenedor.editById(idItem, editedProperties);

  if (response === null)
    return res.json({ error: "No se encontro el producto" });

  res.send(response);
  

});

router.delete("/:id", (req, res) => {
  const idItem = parseInt(req.params.id);
  contenedor.deleteById(idItem);
  res.json({ mensaje: `El item con el ID ${idItem} fue eliminado` });
});

module.exports = router;
