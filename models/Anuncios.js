const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const User = require('./User')

const Anuncios = db.define('Anuncios', {

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    preco: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Anuncios.belongsTo(User)
User.hasMany(Anuncios)

module.exports = Anuncios