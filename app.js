// const express = require('express')//handlebars
// const exphbs = require('express-handlebars')
import express from 'express';
import { engine } from 'express-handlebars';
//const session = require('express-session')
//const FileStore = require('session-file-store')(session)//para salvar as sessoes na pasta /sessions
//const flash = require('express-flash')//resposavel pelas nossas mensagens

const app = express();

//template engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.get('/', (req,res) => {
    res.render('home')
})

app.listen(3000,()=>{
    console.log('Servidor rodando em http://localhost:3000')
})