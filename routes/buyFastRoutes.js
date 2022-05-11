const express = require('express')
const router = express.Router()
const BuyfastController = require('../controllers/buyfastController')
const checkAuth = require('../helpers/auth').checkAuth


//rota meusAnuncios
router.get('/meusAnuncios', checkAuth, BuyfastController.meusAnuncios)
router.post('/remove', checkAuth, BuyfastController.anuncioRemove)

//rota cadastro
router.post('/cadastro', checkAuth, BuyfastController.cadastroSave)
router.get('/cadastro', checkAuth, BuyfastController.cadastro)

//rota criar anuncio
router.post('/createAnuncios',checkAuth, BuyfastController.createAnuncioSave)
router.get('/createAnuncios',checkAuth, BuyfastController.createAnuncios)
//rota '/'
router.get('/', BuyfastController.buyfast)

module.exports = router