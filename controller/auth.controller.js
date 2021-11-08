const Usuario = require("../model/Usuario");
const Proyecto = require('../model/Proyecto')
const bcryptjs = require('bcryptjs')

const formIniciarSesion = async (req, res) => {
    try {
        if(req.session.user){
            const registros = await Proyecto.findAll();
            return res.render('proyecto', {
                titulo: 'Nuevo Proyecto',
                proyectos: registros,
                errores: []
            });
        }


        return res.render("iniciarSesion", {
            titulo: "Iniciar Sesión en Uptask"
        })
    } catch (error) {

    }
}

const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;
    try {
        const registro = await Usuario.findOne({
            where: { email }
        })
     
        if (!registro) {
            return res.status(400).render("iniciarSesion", {
                titulo: "Iniciar Sesión en Uptask",
                error: "Correo no existe"
            })
        }

        const password2 = bcryptjs.compareSync(password, registro.password);
        if(!password2){
            return res.status(400).render("iniciarSesion", {
                titulo: "Iniciar Sesión en Uptask",
                error: "Contraseña invalida",
                email
            })
        }

        req.session.user = registro.email;
        req.session.identificador = registro.id;

        //const registro
        return res.status(200).redirect("../proyecto");

    } catch (error) {
    
        return res.status(400).render("iniciarSesion", {
            titulo: "Iniciar Sesión en Uptask",
            error: "Datos invalidos"
        })
    }
}


module.exports = {
    formIniciarSesion,
    iniciarSesion
}