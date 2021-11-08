const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug')
const { v4: uuidv4 } = require('uuid')

const Proyecto = db.define('Proyecto', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: Sequelize.STRING },
    url: { type: Sequelize.STRING }
},{

    hooks: {
        beforeCreate(proyecto){
            const url = slug(proyecto.nombre).toLocaleLowerCase();
            proyecto.url = `${url}${uuidv4()}`;
        }
    },

    tableName: 'Proyecto',
    createdAt: false,
    updatedAt: false
})

module.exports = Proyecto