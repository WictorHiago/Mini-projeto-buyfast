const Anuncios = require('../models/Anuncios')
const User = require('../models/User')

module.exports = class BuyfastController {

    static async buyfast(req,res) {
        res.render('pages/home')
    }

    //CREATE
    static createAnuncios(req, res) {
        res.render('pages/createAnuncios')
    }

    static async createAnuncioSave(req, res) {

        const anuncio = {
            title: req.body.title,
            descricao: req.body.descricao,
            preco: req.body.preco,
            endereco: req.body.endereco,
            UserId: req.session.userid
        }

        try{
            await Anuncios.create(anuncio)

            req.flash('message', 'Anuncio criado com Sucesso!!')
            req.session.save(() => {
                res.redirect('pages/meusAnuncios')
            })

        } catch(err) {
            console.log('ERRO inesperado ' + err)
        }
    }

    static meusAnuncios(req,res) {
        res.render('pages/meusAnuncios')
    }
}