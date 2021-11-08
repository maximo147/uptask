const Sequelize = require('sequelize')
const db = require('../config/db')
const Proyecto = require('../model/Proyecto')


const Usuario = db.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: { 
        type: Sequelize.STRING(80), 
        allowNull: false ,
        validate: {
            isEmail: {
                msg: "Debe ingresar un email correcto"
            },
            notEmpty: {
                msg: "Debe ingresar un correo"
            }
        },
        unique: {
            args: true,
            msg: "Usuario ya registrado"
        }
    },
    password: { 
        type: Sequelize.STRING(60), 
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Debe ingresar una contraseña"
            }
        }
    },
    token: {
        type: Sequelize.STRING
    },
    fechaCaducidad: {
        type: Sequelize.DATE
    }
},{
    tableName: "Usuario",
    updatedAt: false,
    createdAt: false
})

Usuario.hasMany(Proyecto);


module.exports =  Usuario