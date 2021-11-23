const express = require("express");
const { Router } = express;
const routerCart = new Router();
const Cart = require("../class/Cart");
const filePath = "./db/carts.txt";

const handleCarts = new Cart(filePath);

//Crea un carrito y devuelve su id
routerCart.post("/", async (req, res) => {
  const newCartId = await handleCarts.create();
  res.json({newCartId});
});
//Vacía un carrito y lo elimina
routerCart.delete("/:id", async (req, res) => {
  const idCart = parseInt(req.params.id);
  const idDeletedCart = await handleCarts.deleteById(idCart);

  if(idDeletedCart === null){
    res.json({ mensaje : `El carrito con el ID ${idCart} NO EXISTE`})
    return;
  }
  res.json({ mensaje: `El CARRITO con el ID ${idDeletedCart} fue eliminado`});
});

//Me permite listar todos los productos guardados en el carrito
routerCart.get("/:id/productos", async (req, res) => {
  const idCart = parseInt(req.params.id);
  const arrProducts = await handleCarts.getById(idCart);

  if(arrProducts === null){
    res.json({ mensaje : `El carrito con el ID ${idCart} NO EXISTE`})
    return;
  }

  res.json({arrProducts});
});

//Para incorporar productos al carrito por su id de producto
//recibe array de productos
routerCart.post("/:id/productos", async (req, res) => {
  const idCart = parseInt(req.params.id);
  const cart = await handleCarts.addProducts(idCart, req.body);

  if(cart === null){
    res.json({ mensaje : `El carrito con el ID ${idCart} NO EXISTE`})
    return;
  }

  res.json({mensaje: `Se actualizo el carrito ${idCart} con los siguientes productos:`, nuevosProductos: req.body});
  
});

//Eliminar un producto del carrito por su id de carrito y de producto
routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
  const idCart = parseInt(req.params.id);
  const idProduct = parseInt(req.params.id_prod);
  const cart = await handleCarts.deleteProduct(idCart, idProduct);

  if(cart === null){
    res.json({ mensaje : `El carrito con el ID ${idCart} NO EXISTE`})
    return;
  }

  res.json({mensaje: `Se actualizo el carrito con el ID ${cart} ---- se elimino el item ID:${idProduct}`});

});

module.exports = routerCart;
