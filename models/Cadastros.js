const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const User = require('./User')

const Cadastros = db.define('Cadastros', {

    nome: {
        type: DataTypes.STRING,
        require: true,
    },
    sobrenome: {
        type: DataTypes.STRING,
        require: true,
    },
    contato: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    identidade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profissao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },

})

Cadastros.belongsTo(User) //cadastro tem apenas Um usuario
User.hasMany(Cadastros) //Um usuario tem muitos endereços
module.exports = Cadastros