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

const usuarioHome = (req, res) => {
    var usuarioLogado = req.user.email
    res.render('usuario-home', { layout: 'mainUsuario', usuarioLogado: usuarioLogado})
}

const listarDocumentos = (req, res) => {

    var usuarioLogado = req.user.email
    var listaDocumentos=[]
    var listaDownloadOn = []
    var listaDownloadOff = []

    Documento.find().sort({'nome': 'asc'}).lean().then( (listaDocumentos) => {
        listaDocumentos.forEach( (documento) => {
            if (documento.status == "Disponível para download") {
                if (documento.downloads.indexOf(usuarioLogado) == -1) {
                    listaDownloadOn.push(documento)
                } else {
                    listaDownloadOff.push(documento)
                }
            }
        })
        res.render('usuario-listar-documentos', { layout: 'mainUsuario', usuarioLogado: usuarioLogado, listaDocumentos: listaDocumentos, listaDownloadOn: listaDownloadOn, listaDownloadOff: listaDownloadOff})    
    })

}

const download = async (req, res) => {
    var usuarioLogado = req.user.email
    var erros = []
    var acertos = []
    
    Documento.findOne({_id: req.params.id}).then( (documento) => {
        if (documento.downloads.indexOf(usuarioLogado) == -1) { // Se realmente esse arquivo ainda não foi baixado

            const temp = new mongoose.Types.ObjectId(documento.idConteudo)
            var readstream = bucket.openDownloadStream(temp)
            readstream.on("error", () => {
                res.end("ERRO AO CARREGAR O ARQUIVO");
            })
            documento.downloads.push(usuarioLogado)
            documento.save()
            readstream.pipe(res)
        } else {
            res.redirect('/usuario/listar-documentos')
        }
    })
}

export default {
    usuarioHome,
    listarDocumentos,
    download
}
