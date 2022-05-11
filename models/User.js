const { DataTypes} = require('sequelize')

const db = require('../db/conn')
const Anuncios = require('./Anuncios')

//User

const User = db.define('User', {

    name: {
        type: DataTypes.STRING,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    }

})


module.exports = User