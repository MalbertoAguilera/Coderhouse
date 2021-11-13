//configuracion websocket
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
// FIN configuracion websocket
const PORT = 3000 || process.env.PORT;
const Contenedor = require("./class/Contenedor");
const Message = require("./class/Message");
const filePathProducts = "./db/productos.txt";
const filePathMessages = "./db/messages.txt";
const handlerProducts = new Contenedor(filePathProducts);
const handlerMessages = new Message(filePathMessages);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

//websocket
//abre canal de parte del servidor
//connection EVENTO
io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  //Socket PRODUCTOS
  socket.emit("server_sendProducts", await handlerProducts.getAll());

  socket.on("client_newProduct", async (item) => {
    await handlerProducts.save(item);
    io.emit("server_sendProducts", await handlerProducts.getAll());
  });
  //FIN Socket PRODUCTOS

  //Socket MENSAJES
  socket.emit("server_sendMessages", await handlerMessages.getAllMessages());

  socket.on("client_newMessage", async (objmessage) => {
    
    await handlerMessages.save(objmessage);
    io.emit("server_sendMessages", await handlerMessages.getAllMessages());
  })


});

server.listen(PORT, () => {
  console.log(
    `El servidor se encuentra escuchando por el puerto ${server.address().port}`
  );
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
