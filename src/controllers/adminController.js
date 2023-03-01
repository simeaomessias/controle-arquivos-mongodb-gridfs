// Express
import express from 'express'
const router = express.Router();

// Dotenv
import dotenv from 'dotenv'
dotenv.config()

// MongoDB
import mongoose from 'mongoose'
import UsuarioSchema from '../models/Usuario.js'
const Usuario = mongoose.model('usuarios', UsuarioSchema);
import DocumentoSchema from '../models/Documento.js'
const Documento = mongoose.model('documentos', DocumentoSchema);

import mongo from 'mongodb';
var db = mongoose.connection
const bucket = new mongo.GridFSBucket(db);

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

const editarUsuario = (req, res) => {
    var usuarioLogado = req.user.email
    var erros = []
    var acertos = []
            
    // Validação - Nome
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido"})
    }

    console.log("ERROS")
    console.log(erros)

    // Alterando e salvando a edição
    if (erros.length == 0) {
        Usuario.updateOne(
            {_id: req.params.id},
            {
                nome: req.body.nome,
                status: req.body.status
            })
            .lean().then( (usuario) => {
                acertos.push({texto: "Usuário editado com sucesso!"})
                res.redirect('/admin/listar-usuarios')
            }).catch ( (erro) => {
                res.send("ID inexistente.")
            }
        )
    } else {
        res.send("Dados inconsistentes para realizar a alteração.")
    }
}

const listarDocumentos = (req, res) => {
    var usuarioLogado = req.user.email
    var listaDocumentos=[]
    Documento.find({}).sort({'nome': 'asc'}).lean().then( (listaDocumentos) => {
        res.render('admin-listar-documentos', { layout: 'mainAdmin', usuarioLogado: usuarioLogado, listaDocumentos: listaDocumentos})    
    })
}

const telaCadastroDocumento = (req, res) => {
    var usuarioLogado = req.user.email
    res.render('admin-cadastrar-documento', { layout: 'mainAdmin', usuarioLogado: usuarioLogado})
}

const cadastrarDocumento = async (req, res) => {
    var usuarioLogado = req.user.email
    var erros = []
    var acertos = []

    var id = ""
    var nomeI = ""
    var nomeF = ""
    var dataUpload_fsFiles = ""

    // Busca do ID do arquivo do upload e retirada do marcador _*_*_
    const cursor = bucket.find({});
    for await (const doc of cursor) {
        if (doc.filename.substring(0,5) == "_*_*_") {
            id = doc._id
            nomeI = doc.filename
            dataUpload_fsFiles = doc.uploadDate
        }
    }
    nomeF = nomeI.slice(5, nomeI.length)
    bucket.rename(id,nomeF)
    await cursor.close();
    
    // Inclusão dos dados do arquivo do upload em Documento
    if (erros.length == 0) {
        const novoDocumento = new Documento({
            dataUpload: dataUpload_fsFiles,
            descricao: req.body.descricao,
            nome: nomeF,
            idConteudo: id,
            status: req.body.status,
            downloads: ""
        })
        novoDocumento.save().then( () => {
            res.redirect('/admin/listar-documentos')
        }).catch( (erro) => {
            res.redirect('/admin/listar-documentos')
        })
    } else {
        res.send(erros)
    }
}

const telaEdicaoDocumento = async (req, res) => {
   
        var usuarioLogado = req.user.email
        var listaDownloads = [];
        var documento = ""
        
        documento = await Documento.findOne({_id: req.params.id}).lean()
    
        await Usuario.find({email: {$in: documento.downloads}}).lean().then( (usuarios) => {
            if (usuarios) {
                usuarios.forEach( (item) => {
                    listaDownloads.push({"txtNome": item.nome, "txtEmail": item.email})
                })
            }
        })
        
        res.render('admin-editar-documento', { layout: 'mainAdmin', usuarioLogado: usuarioLogado, documento: documento, listaDownloads: listaDownloads})
}

const editarDocumento = (req, res) => {

    var usuarioLogado = req.user.email
    var erros = []
    var acertos = []

    // Alterando e salvando a edição
    if (erros.length == 0) {
        Documento.updateOne(
            {_id: req.params.id},
            {
                descricao: req.body.descricao,
                status: req.body.status
            })
            .lean().then( (documento) => {
                acertos.push({texto: "Documento editado com sucesso!"})
                res.redirect('/admin/listar-documentos')
            }).catch ( (erro) => {
                res.send("ID inexistente.")
            }
        )
    } else {
        res.send("Dados inconsistentes para realizar a alteração.")
    }
}

export default {
    adminHome,
    listarUsuarios, 
    telaCadastroUsuario,
    cadastrarUsuario,
    telaEdicaoUsuario,
    editarUsuario,
    listarDocumentos,
    telaCadastroDocumento,
    cadastrarDocumento,
    telaEdicaoDocumento,
    editarDocumento
}
