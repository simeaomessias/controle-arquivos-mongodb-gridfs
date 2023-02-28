// Express
import express from 'express'
const router = express.Router();

// Passport
import passport from "passport"
import passportConfig from '../config/auth.js'
passportConfig(passport)


// Home
const telaLogin = (req, res) => {
    res.render('login', {layout: 'mainGeral'})
}

const validaLogin = (req, res, next) => {
    var erros = []
    
    passport.authenticate('local', (err, user, info) => {
        if (err) {return next(err)}
        if (!user) {
            erros.push({texto: "Dados incorretos! Tente novamente."})
            return res.render('login', { layout: 'mainGeral', erros: erros })
        }
        if (user.status == "Inativo") {
            erros.push({texto: `${user.email} (inativado)`})
            erros.push({texto: "Procure o administrador."})
            return res.render('login', { layout: 'mainGeral', erros: erros })
        }
        req.logIn (user, (err) => {
            if (err) {return next(err)}
            if (user.tipo == "admin") {
                return res.redirect('/admin')
            } else if (user.tipo == "usuario") {
                return res.redirect('/usuario')
            }
        })
    }) (req, res, next)
}

const logout = (req, res, next) => {
    req.logout( (err) => {
        if (err) { return next(err); }
        res.redirect('/');  
    })
}

export default {
    telaLogin,
    validaLogin,
    logout
}
