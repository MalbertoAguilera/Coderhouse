const express = require("express");
const router = require("./routes/index");

const app = express();
const PORT = 3000 || process.env.PORT;

app.set("view engine","ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({extended:true}))


//evita enviar staticos por defecto
app.use("/static",express.static(__dirname + "/public"));

app.get('/', (req , res)=>{
    res.render("index");
 })

app.use("/productos", router);

const server = app.listen(PORT, () => {
      console.log(`El servidor se encuentra escuchando por el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));
