const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

//ROUTES
router.get('/login', AuthController.login)              //LOGIN
router.post('/login', AuthController.loginPost)        //LOGIN-POST
router.get('/register', AuthController.register)        //REGISTER
router.post('/register', AuthController.registerPost)   //REGISTER-POST
router.get('/logout', AuthController.logout)
module.exports = router