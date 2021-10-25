const express = require("express");
const router = require("./routes/index");

const app = express();

app.use(express.json());

//evita enviar staticos por defecto
app.use("/static",express.static(__dirname + "/public"));

app.use("/api/productos", router);

app.listen(3000);
