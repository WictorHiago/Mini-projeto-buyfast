const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mysql2 = require('mysql2')
const { connect } = require('http2')

//porta do servidor
//const port = 3000 / usda antes da conexao com mysql
//module express
const app = express()
//module path
//const basePath = path.join(__dirname,'templates')
//diretorio css/imgs
app.use(express.static('public'))

//egine handlebars
app.set("view engine", 'handlebars')
app.engine('handlebars', exphbs.engine())//OBS


//====== setup padrao sem handlebars ==========
// app.get('/', (req,res) => {
//     res.sendFile(`${basePath}/index.html`)
// })
// app.get('/cadastro', (req,res) => {
//     res.sendFile(`${basePath}/cadastro.html`)
// })
// app.get('/login', (req,res) => {
//     res.sendFile(`${basePath}/login.html`)
// })
// app.get('/register', (req,res) => {
//     res.sendFile(`${basePath}/register.html`)
// })

// //ERRO 404
// app.use((req,res) => {
//     res.status(404).sendFile(`${basePath}/404.html`)
// })


//Rotas usando handlebars
app.get('/', (req,res) => {
    res.render('pages/home')
})

app.get('/login', (req,res) => {
    res.render('pages/login')
})
app.get('/register', (req,res) => {
    res.render('pages/register')
})
app.get('/cadastro', (req,res) => {
    res.render('pages/cadastro')
})

//app.listen( port , console.log(`Rodando na porta ${port}`))

//conexao com banco de dados
const conn = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'projetodb2',
})

conn.connect((err) => {
    if(err) {
        console.log(err)
    }
    console.log('conexão com Mysql Bem sucedida!')

    app.listen(3000)
})