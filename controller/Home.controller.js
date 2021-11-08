const Proyecto = require('../model/Proyecto')

const getHome = async (req, res) => {
    try {
        const usuarioId = req.session.identificador;
        const registros = await Proyecto.findAll({where: {usuarioId}});
        if (registros) {
            return res.render('index', {
                titulo: "Proyectos",
                proyectos: registros
            })
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getHome
}