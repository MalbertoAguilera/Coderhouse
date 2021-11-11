//configuracion websocket
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
// FIN configuracion websocket
const PORT = 3000 || process.env.PORT;
const Contenedor = require("./class/Contenedor");
const filePath = "./db/productos.txt";
const handlerProducts = new Contenedor(filePath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

//websocket
//abre canal de parte del servidor
//connection EVENTO
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  //titulo, data
  socket.emit("message_client", await handlerProducts.getAll());

  socket.on("message_back", (data) => {
    console.log("Mensaje desde el clinte:", data);
  });

  socket.on("message_client", async (data) => {
    await handlerProducts.save(data);
    socket.emit("message_client", await handlerProducts.getAll());
  });
});

server.listen(PORT, () => {
  console.log(
    `El servidor se encuentra escuchando por el puerto ${server.address().port}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
