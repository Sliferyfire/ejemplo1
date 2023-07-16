const express = require("express");
const usuariosRuta = require("./rutas/usuarios");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", usuariosRuta);

const port = 4000;

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});

