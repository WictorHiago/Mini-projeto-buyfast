const { Sequilize } = require('sequelize')

const sequilize = new Sequilize('cadastrodb', 'root','' {
    host: 'localhost',
    dialect: 'mysql',
})