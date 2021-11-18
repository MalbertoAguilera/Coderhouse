const express = require("express");
const routerProducts = require("./routes/routerProducts");
const routerCart = require("./routes/routerCart");

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}))


//evita enviar staticos por defecto
app.use("/static",express.static(__dirname + "/public"));

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCart);

app.use(function (req, res, next) {
      res.status(404).json({
        error: -2,
        descripcion: `Ruta ${req.url}, metodo ${req.method} no implementada`
      });
    });

const server = app.listen(PORT, () => {
      console.log(`El servidor se encuentra escuchando por el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));