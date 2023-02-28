import passportLocal from 'passport-local'
const localStrategy = passportLocal.Strategy

import mongoose from "mongoose"

// Model de Usuário
import UsuarioSchema from '../models/Usuario.js'
const Usuario = mongoose.model('usuarios', UsuarioSchema);

// Configuração e exportação de todo sistema de autenticação
export default (passport) => {

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done)=>{
        Usuario.findOne({email: email}).then((usuario)=>{
            if (!usuario) {
                return done(null, false, {message: 'Esta conta não existe'})
            }
            if (senha == usuario.senha) {
                return done(null, usuario)
            } else {
                return done (null, false, {message: "Senha incorreta. Tente novamente."})
            }
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })
    
    passport.deserializeUser( async (id, done) => {
        /*
        Usuario.findById (id, (erro, usuario) => {
            done(erro, usuario)      
        })
        */
        let usuario = await Usuario.findById(id)
        let erro = ""
        if (!usuario) {
            erro = "Não foi encontrado usuário com o id passado"
        }
        done(erro, usuario)
    })
}
