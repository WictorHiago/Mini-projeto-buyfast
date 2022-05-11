const Anuncios = require('../models/Anuncios')
const Cadastros = require('../models/Cadastros')
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

    static cadastro(req, res) {
        console.log(res.render('pages/cadastro'))
    }

    static async cadastroSave(req,res) {
        const cadastro = {

            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            celular: req.body.celular,
            cpf: req.body.cpf,
            identidade: req.body.identidade,
            profissao: req.body.profissao,
            email:req.body.email,
            UserId: req.session.userid
        }

        try{
            await Cadastros.create(cadastro)

            req.flash('message', 'Cadastro concluido!!')
            req.session.save(() => {
                res.redirect('pages/cadastro')
            })
        }catch(err) {
            console.log('erro inesperado' + err)
        }
    }

    static async meusAnuncios(req,res) {
        const userId = req.session.userid
        const user = await User.findOne(
            {
                where: { id: userId,},
                include: Anuncios,
                plain: true,
            })

            if(!user) {
                res.redirect('/login')
            }

            const anuncios = user.Anuncios.map((result)=> result.dataValues)
            console.log(anuncios)

        res.render('pages/meusAnuncios', {anuncios})
    }

    static async anuncioRemove(req,res) {
        const id = req.body.id
        const UserId = req.session.userid

        try{
            await Anuncios.destroy( { where: {id: id, UserId: UserId} })

            req.flash('message', 'Anuncio removido!')

            req.session.save(() => {
                res.redirect('/pages/meusAnuncios')
            })
        } catch (error) {
            console.log('aconteceu um ' + error)
        }
    }
}