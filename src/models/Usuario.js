import mongoose from 'mongoose'
const {Schema} = mongoose

// Definição do Model
const UsuarioSchema = new Schema({
    tipo: {
        type: String,
        default: "usuario"
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        default: "@123"
    }
})

export default UsuarioSchema