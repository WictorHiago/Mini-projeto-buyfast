const express = require('express')
const router = express.Router()
const BuyfastController = require('../controllers/buyfastController')
const checkAuth = require('../helpers/auth').checkAuth


//rota meusAnuncios
router.get('/meusAnuncios', checkAuth, BuyfastController.meusAnuncios)

//rota criar anuncio
router.post('/createAnuncios',checkAuth, BuyfastController.createAnuncioSave)
router.get('/createAnuncios',checkAuth, BuyfastController.createAnuncios)
//rota '/'
router.get('/', BuyfastController.buyfast)

module.exports = router