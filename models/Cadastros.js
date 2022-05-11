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
        notnull: true,
    },
    cpf: {
        type: DataTypes.STRING,
        NOTNULL: true,
    },
    identidade: {
        type: DataTypes.STRING,
        NOTNULL: true,
    },
    profissao: {
        type: DataTypes.STRING,
        NOTNULL: true,
    },
    email: {
        type: DataTypes.STRING,
        NOTNULL: true,
    },
    bairro: {
        type: DataTypes.STRING,
        NOTNULL:true
    },
    rua: {
        type: DataTypes.STRING,
        NOTNULL: true
    },
    complemento: {
        type: DataTypes.STRING,
        NOTNULL:true
    },
    estado: {
        type: DataTypes.STRING,
        NOTNULL:true
    }

})

Cadastros.belongsTo(User) //cadastro tem apenas Um usuario
User.hasMany(Cadastros) //Um usuario tem muitos endereços
module.exports = Cadastros