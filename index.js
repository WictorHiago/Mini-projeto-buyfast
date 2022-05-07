const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const mysql2 = require('mysql2')
const { connect } = require('http2')
const conn = require('./db/conn')//banco de dados
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()
//CONTROLLER
const buyfastController = require('./controllers/buyfastController')

//MODELS
const Cadastros = require('./models/Cadastros')
const User = require('./models/User')

//ROUTES
const buyFastRoutes = require('./routes/buyFastRoutes')
const authRoutes = require('./routes/authRoutes')

//TEMPLATE ENGINE
app.set("view engine", 'handlebars')
app.engine('handlebars', exphbs.engine())
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(flash())

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

app.use((req,res,next) => {

    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})


app.use('/pages', buyFastRoutes)
app.use('/', authRoutes)
app.use('/', buyfastController.buyfast)

conn
    //.sync()
    .sync({force:true})// usando force:true para fazer ligação entre as tabelas
    .then(() => {
        app.listen(3000)
        console.log('Servidor On: Port/ localhost:3000')
    })
    .catch((err) => {
        console.log(err)
    })