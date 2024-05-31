const cors = require("cors");
const express = require("express");
const routes = require("./routes/index");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

//Conectar a mongodb
mongoose.connect(process.env.MONGODB_URL);

//Mejorar errores de conexión
mongoose.connection.on("error", (error) => {
  console.error("Error al conectar a la base de datos: ", error);
});

mongoose.connection.once("open", () => {
  console.log("Conectado a la base de datos correctamente");
});

// Definir un dominio(s) para recibir peticiones
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    //Revisar si la petición viene de un servidor que está en whiteList
    const existe = whiteList.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));

//Rutas de la app
app.use("/", routes());

//carpeta pública
app.use(express.static("uploads"));


app.listen(9000, () => {
  console.log(`Servidor escuchando el el puerto: 9000`);
});
