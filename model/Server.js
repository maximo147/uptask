const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("../config/db");
const cors = require("cors")
const {vardum} = require('../helpers/helper')
const session = require('express-session')
require("../model/Proyecto");
require("../model/Tarea");
require("../model/Usuario")
require('../controller/email')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //Habilitar Pug
        this.app.set("view engine", "pug");
        //Añadir carpetas de las vistas
        this.app.set("views", path.join(__dirname, "../views"));

        this.conexion();
        this.middleware();
        this.routes();

    }

    conexion = async () => {
        db.sync()
            .then(() => console.log("Conectado al servidor"))
            .catch((error) => console.error(error));
    };

    middleware = () => {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static("public"));
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(session({
            secret: "micontra",
            resave: true,
            saveUninitialized: true
        }))
        this.app.use((req, res, next) => {
            res.locals.vardump = vardum;
            next();
        });
        
    };

    routes = () => {
        this.app.use("/", require("../routes/Home.router"));
        this.app.use("/auth", require("../routes/Auth.router"));
        this.app.use("/cuenta", require("../routes/Cuenta.router"));
        this.app.use("/proyecto", require("../routes/Proyecto.router"));
        this.app.use("/session", require("../routes/Session.router"));
        this.app.use("/tarea", require("../routes/Tarea.router"));
        this.app.use("/usuario", require("../routes/Usuario.router"));

    };

    listen = () => {
        this.app.listen(this.port, () => console.log(`El servidor esta funcionando en Puerto: ${this.port}`));
    };
}

module.exports = Server;
