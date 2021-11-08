const Sequelize = require('sequelize')
const db = require('../config/db')
const Proyecto = require('../model/Proyecto')

const Tarea = db.define('tarea', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    tarea: { type: Sequelize.STRING(100) },
    estado: { type: Sequelize.INTEGER }
},{
    tableName: 'Tarea',
    createdAt: false,
    updatedAt: false
})

Tarea.belongsTo(Proyecto);

module.exports = Tarea