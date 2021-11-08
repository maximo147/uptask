
const validarSession = (req, res, next) => {
    if(!req.session.identificador){
        return res.render("iniciarSesion",{
            titulo: "Iniciar Sesión en Uptask"
        })
    }
    next()
}

module.exports = validarSession