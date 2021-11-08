const Proyecto = require('../model/Proyecto');
const Tarea = require('../model/Tarea')

const postTarea = async (req, res) => {
    try {
        const { url } = req.params;
        const { tarea } = req.body;
        const proyecto = await Proyecto.findOne({ where: { url } })
        const estado = 0;

        if (!proyecto) {
            return res.send('No se puedo registrar tarea');
        }
        const ProyectoId = proyecto.dataValues.id;

        const registro = await Tarea.create({ tarea, estado, ProyectoId })

        if (!registro) {
            return res.send('No se puedo registrar tarea');
        } else {
            return res.redirect(`/proyecto/${url}`);
        }


    } catch (error) {

    }
}

const putTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const {estado, url_proyecto} =  req.body;

        const tarea = await Tarea.findOne({ where: { id:id } })
        if(!tarea){
            return res.status(400).send("No existe tarea");
        }

        const proyectos =  await Proyecto.findAll();
        
        if(estado === '1'){
            await Tarea.update({estado: 0}, {where:{id: id}})
        }else{
            await Tarea.update({estado: 1}, {where:{id: id}})
        }
        return res.status(200).send('Actualizado')
        


    } catch (error) {
        console.log(error)
    }
}

const deleteTarea = async(req, res) => {
    try {
        const { id } = req.params
        const registro = await Tarea.destroy({where: {id: id}});
        if(!registro){
            return res.status(400).send('No se puedo eliminar');
        }
        return res.status(201).send("Eliminado")
    } catch (error) {
        
    }
}

module.exports = {
    postTarea,
    putTarea,
    deleteTarea
}