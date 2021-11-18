const express = require("express");
const { Router } = express;
const routerCart = new Router();
const Cart = require("../class/Cart");
const filePath = "./db/carts.txt";

const handleCarts = new Cart(filePath);

const admin = false;
const msjError = {
  error: -1,
  mensaje: "usuario sin privilegios",
};


//Crea un carrito y devuelve su id
routerCart.post("/", async (req, res) => {});

//Vacía un carrito y lo elimina
routerCart.delete("/:id", (req, res) => {});

//Me permite listar todos los productos guardados en el carrito
routerCart.get("/", async (req, res) => {
  await handleCarts.createCart();
});

//Para incorporar productos al carrito por su id de producto
routerCart.post("/:id/productos", async (req, res) => {});

//Eliminar un producto del carrito por su id de carrito y de producto
routerCart.delete("/:id/productos/:id_prod", async (req, res) => {});

module.exports = routerCart;
