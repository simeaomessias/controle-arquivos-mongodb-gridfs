import mongoose from 'mongoose'
const {Schema} = mongoose

// Definição do Model
const DocumentoSchema = new Schema({
    dataUpload: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    idConteudo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    downloads: [String]
})

export default DocumentoSchema