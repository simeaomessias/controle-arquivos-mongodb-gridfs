// Express
import express from 'express'
const router = express.Router();

// MongoDB
import mongoose from 'mongoose'
import UsuarioSchema from '../models/Usuario.js'
const Usuario = mongoose.model('usuarios', UsuarioSchema);
import DocumentoSchema from '../models/Documento.js'
const Documento = mongoose.model('documentos', DocumentoSchema);

const adminHome = (req, res) => {
    var usuarioLogado = req.user.email
    res.render('admin-home', { layout: 'mainAdmin', usuarioLogado: usuarioLogado})
}

const listarUsuarios = (req, res) => {
    var usuarioLogado = req.user.email
    Usuario.find({'tipo': 'usuario'}).sort({'nome': 'asc'}).lean().then( (listaUsuarios) => {
        res.render('admin-listar-usuarios', { layout: 'mainAdmin', usuarioLogado: usuarioLogado, listaUsuarios: listaUsuarios})    
    })
}

const telaCadastroUsuario = (req, res) => {
    var usuarioLogado = req.user.email
    res.render('admin-cadastrar-usuario', { layout: 'mainAdmin', usuarioLogado: usuarioLogado})
}

const cadastrarUsuario = (req, res) => {
    var usuarioLogado = req.user.email
    var erros = []
    var acertos = []
            
    // Validação - Nome
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido"})
    }
    // Validação - Email
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({texto: "E-mail inválido"})
    }

    if (erros.length == 0) {
        const novoUsuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            status: req.body.status
        })
        
        novoUsuario.save().then( () => {
            acertos.push({texto: "Usuário cadastrado com sucesso."})
            res.redirect('/admin/listar-usuarios')
        }).catch( (erro) => {
            erros.push({texto: "Erro ao cadastrar o usuário."})
            res.redirect('/admin/listar-usuarios')
        })
    } else {
        res.send(erros)
    }
}

const telaEdicaoUsuario = (req, res) => {

    var usuarioLogado = req.user.email

    var listaDownloads = [{}]

    Usuario.findOne({_id: req.params.id}).lean().then( (usuario) => {
        Documento.find().lean().then( (listaDocumentos) => {
            listaDocumentos.forEach( (documento) => {
                if (documento.downloads.indexOf(usuario.email) !== -1) {
                    listaDownloads.push({"txtDescricao": documento.descricao, "txtNome": documento.nome})
                }
            })
            res.render('admin-editar-usuario', { layout: 'mainAdmin', usuarioLogado: usuarioLogado, usuario: usuario, listaDownloads: listaDownloads})
        })
    })
    
}

export default {
    adminHome,
    listarUsuarios, 
    telaCadastroUsuario,
    cadastrarUsuario,
    telaEdicaoUsuario
}
