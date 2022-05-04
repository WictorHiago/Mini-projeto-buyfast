const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const mysql2 = require('mysql2')
const { connect } = require('http2')
const conn = require('./db/conn')//banco de dados
const FileStore = require('session-file-store')(session)
const flash = require('connect-flash/lib/flash')

//models
const Cadastros = require('./models/Cadastros')
const User = require('./models/User')
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

//necessario para recerber respostas do body
app.use(express.urlencoded({
    extended: true
}))
//middleware para receber dados JSON
app.use(express.json())

// app.use((req,res,next) => {
//     //se o usuario nao estiver logado passamos pro next
//     if(req.session.userid) {
//         //se o usuario ESTIVE logado, mano a sessao da requisiscao para a resposta
//         res.locals.session = req.session
//     }
//     next()
// })

//session diddleware , diz onde o express ira salvar nossas sessoes
app.use(session({
    name:'session',
    secret: 'nosso_secret',
    resave: false, //se caiar a sessao o usuario cai
    saveUnitialized: false,
    store: new FileStore({
        logFn: function() {},
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    //salvar cookie no navegador do usuario
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}))

app.use(flash())

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

// //conexao com banco de dados
// const conn = mysql2.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'projetodb2',
// })


//conexão sem sequelize
// conn.connect((err) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log('conexão com Mysql Bem sucedida!')

//     app.listen(3000)
// })

conn
    .sync({force:true})// usando force:true para fazer ligação entre as tabelas
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })