const express = require('express')
const exphbs = require('express-handlebars')//handlebars
const session = require('express-session')
const FileStore = require('session-file-store')(session)//para salvar as sessoes na pasta /sessions