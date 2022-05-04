const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('projetodb2', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conexão conn tatus ok')
} catch(err){
    console.log(`Não foi possivel conectar ${err}`)
}

//exportação
module.exports = sequelize