const express = require("express");
const router = require("./routes/index");
const handlebars = require("express-handlebars");

const app = express();
const PORT = 3000 || process.env.PORT;

app.set("views", "./views")
app.set("view engine", "hbs")

//setting for hbs
app.engine(
    "hbs",
    handlebars({
        extname: "hbs",
        layoutsDir: __dirname + "/views/layouts",
        defaultLayout: "index",
        partialsDir: __dirname + "/views/partials"
    })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}))


//evita enviar staticos por defecto
app.use("/static",express.static(__dirname + "/public"));

app.get('/', (req , res)=>{

    res.render("main") 
 
 })

app.use("/productos", router);

const server = app.listen(PORT, () => {
      console.log(`El servidor se encuentra escuchando por el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));
