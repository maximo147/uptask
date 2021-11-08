const Usuario = require("../model/Usuario");
const bcryptjs = require('bcryptjs');
const crypto = require("crypto");
const Sequelize = require('sequelize');
const enviarEmail = require('../controller/email');
const Op = Sequelize.Op;



const getCuenta = (req, res) => {
    try {
        return res.render("crearCuenta", {
            titulo: "Crear una cuenta en Uptask",

        });
    } catch (error) {

    }
}

const crearUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {

        const salt = bcryptjs.genSaltSync(10);
        const password2 = bcryptjs.hashSync(password, salt);
        const registro = await Usuario.create({ email, password: password2 });

        if (!registro) {
            return res.status(400).send({
                message: "No se pudo ingresar usuario"
            });
        }

        return res.redirect('/auth/iniciar-sesion');


    } catch (error) {
        //console.log('erorsss: ', error.errors)
        return res.render("crearCuenta", {
            titulo: "Crear una cuenta en Uptask",
            error: error.errors,
            email,
            password
        })
    }
}

const reestablecerForm = (req, res) => {
    try {
        return res.render("reestablecer", {
            titulo: "Reestablecer contraseña en Uptask"
        });
    } catch (error) {

    }
}

const reestablecerPost = async (req, res) => {
    try {
        const { email } = req.body;
        const registro = await Usuario.findOne({ where: { email } });
        if (!registro) {
            return res.render("reestablecer", {
                titulo: "Reestablecer contraseña en Uptask",
                error: "No existe correo"
            });
        }

        registro.token = crypto.randomBytes(20).toString("hex");
        registro.fechaCaducidad = Date.now() + 3600000;
        await registro.save();

        const requestUrl = `http://${req.headers.host}/usuario/reestablecer/${registro.token}`;

        await enviarEmail.enviar({
            usuario: registro,
            subject: "Reestablecer Password",
            requestUrl,
            archivo: "reestablecer-password"
        })
        return res.render("iniciarSesion",{
            titulo: "Iniciar Sesión en Uptask",
            message: "Se envió un mensaje a tu correo"
        })


    } catch (error) {
        console.log("ERROR: ", error)
        return res.render("reestablecer", {
            titulo: "Reestablecer contraseña en Uptask",
            error: error.errors
        });
    }
}

const reestablecerResetForm = async (req, res) => {
    try {
        const { token } = req.params;
        const usuario = await Usuario.findOne({
            where: {
                token: token,
                fechaCaducidad: { [Op.gte]: Date.now() }
            }
        })
        if (!usuario) {
            console.log("No encontre nada")
            return res.render("reestablecer")
        }

        return res.render("resetPassword", {
            titulo: "Reestablecer Password"
        })

    } catch (error) {

    }
}

const reestablecerReset = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                token: token,
                fechaCaducidad: { [Op.gte]: Date.now() }
            }
        })
        if (!usuario) {
            return res.render("reestablecer")
        }

        usuario.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
        usuario.token = null;
        usuario.fechaCaducidad = null;
        await usuario.save();

        return res.render("iniciarSesion", {
            titulo: "Iniciar sesión en Uptask"
        })
    } catch (error) {

    }
}

module.exports = {
    getCuenta,
    crearUsuario,
    reestablecerForm,
    reestablecerPost,
    reestablecerResetForm,
    reestablecerReset
}