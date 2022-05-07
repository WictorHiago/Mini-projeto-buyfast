const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static login(req,res) {
        res.render('auth/login')
    }

    static async loginPost(req,res) {
        const { name, password } = req.body
        const user = await User.findOne({ where: { name: name } })

        if(!user) {
            req.flash('message', 'Usuário não encontrado!!')
            res.render('auth/login')

            return;
        }
        const passwordMacth = bcrypt.compareSync(password, user.password)

        if(!passwordMacth) {
            req.flash('message', 'Usuário ou Senha Inválido')
            res.render('auth/login')

            return;
        }

        req.session.userid = user.id

        req.flash('message', 'Autenticação realizada')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req,res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body
        //validação de senha
        if(password != confirmpassword) {
            req.flash('message', 'As senhas não conferem')
            res.render('auth/register')

            return;
        }

        const checkIfUserExists = await User.findOne({ where: { email: email } })
        if(checkIfUserExists) {
            req.flash('message', 'O e-mail já existe!!')
            res.render('auth/register')

            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            req.session.userid = createdUser.id
            req.flash('message', 'Conta de Usuário criada com Sucesso!!')
            req.session.save(() => {
                res.redirect('/')
            })
        }catch (err) {
            console.log(err)
        }
        
    }
    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}