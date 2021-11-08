
const Proyecto = require('../model/Proyecto')
const Tarea = require('../model/Tarea')

const getProyectos = async (req, res) => {
    const usuarioId = req.session.identificador;
    const registros = await Proyecto.findAll({ where: { usuarioId } });
    return res.render('proyecto', {
        titulo: 'Nuevo Proyecto',
        proyectos: registros,
        errores: []
    });
}

const getProyecto = async (req, res) => {
    try {
        const { id } = req.params
        const usuarioId = req.session.identificador;
        const proyectoPromise = await Proyecto.findOne({ where: { url: id } });
        const registrosPromise = await Proyecto.findAll({ where: { usuarioId } });
        if (!proyectoPromise) {
            return res.send("Mal, todo mal")

            // return res.render('index',{
            //     titulo: "Proyectos",
            //     error: "Identificador no encontrado"
            // });
        }

        const [proyecto, registros] = await Promise.all([proyectoPromise, registrosPromise]);

        const tareas = await Tarea.findAll({ where: { ProyectoId: proyecto.id } })
        return res.render("task", {
            titulo: "Tareas",
            proyecto,
            proyectos: registros,
            tareas
        });
    } catch (error) {
        console.log(error);
    }
}

const postProyecto = async (req, res) => {
    try {
        const idUser = parseInt(req.session.identificador);
        const registros = await Proyecto.findAll({ where: { usuarioId: idUser } });
        const { nombre } = req.body;
        
        let errores = [];
        if (!nombre) {
            errores.push({ "texto": "Agrega un nombre" })
        }
        if (errores.length > 0) {
            return res.status(400).render('proyecto', {
                titulo: "Nuevo Proyecto",
                proyectos: registros,
                errores: errores
            })
        }

        const registro = await Proyecto.create({ nombre, usuarioId: idUser });
        const registros2 = await Proyecto.findAll({ where: { usuarioId: idUser } });

        if (registro) {
            return res.render('proyecto', {
                titulo: 'Nuevo Proyecto',
                proyectos: registros2,
                errores: []
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Hable con el administrador"
        })
    }

}

const formPutProyecto = async (req, res) => {
    try {
        const { url } = req.params
        const idUser = parseInt(req.session.identificador);

        const proyectoPromise = await Proyecto.findOne({ where: { url: url } })
        const registrosPromise = await Proyecto.findAll({ where: { usuarioId: idUser } });

        const [proyecto, registros] = await Promise.all([proyectoPromise, registrosPromise]);

        return res.render("proyecto", {
            titulo: "Editar Proyecto",
            proyectos: registros,
            proyecto
        })
    } catch (error) {

    }
}

const putProyecto = async (req, res, next) => {
    try {
        const idUser = parseInt(req.session.identificador);
        const { nombre } = req.body;
        const { url } = req.params
        let errores = [];
        if (!nombre) {
            errores.push({ "texto": "Agrega un nombre" })
        }

        if (errores.length > 0) {
            return res.status(400).render('proyecto', {
                titulo: "Nuevo Proyecto",
                proyectos: registros,
                errores: errores
            })
        }

        const registro = await Proyecto.update({ nombre }, { where: { url } });
        const registros = await Proyecto.findAll({ where: { usuarioId: idUser } });

        if (!registro) {
            next();
        }
        return res.render("index", {
            titulo: "Nuevo Proyecto",
            proyectos: registros,
        });

    } catch (error) {

    }
}

const deleteProyecto = async (req, res) => {
    try {
        const { url } = req.params
        console.log('URL: ', req.params)
        await Proyecto.destroy({ where: { url } });
        res.status(200).send('Proyecto eliminado correctamente')
    } catch (error) {

    }
}

module.exports = {
    getProyecto,
    getProyectos,
    postProyecto,
    formPutProyecto,
    putProyecto,
    deleteProyecto
}