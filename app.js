// Express
import express from 'express'
const app = express()

// Pasta "public"
app.use(express.static('public'))

// Express.json() e Express.urlencoded()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Express-handlebars
import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Connect-flash
import flash from 'connect-flash'
app.use(flash())

// Dotenv
import dotenv from 'dotenv'
dotenv.config()

// Mongoose
import mongoose from 'mongoose'
mongoose.set('strictQuery', false);
const mongoUri = process.env.MONGOURI
mongoose.Promise = global.Promise
mongoose.connect(mongoUri).then( () => {
    console.log("BANCO DE DADOS: Conectado.")
    app.emit("connectedDatabase")
}).catch( (erro) => {
    console.log(`BANCO DE DADOS: A conexão com o MongoDB não foi realizada! ERRO: ${erro}`)
})

// Mongodb
import mongo from 'mongodb';

var db = mongoose.connection
const bucket = new mongo.GridFSBucket(db);

// Multer-Gridfs-Storage (para fazer upload e salvar arquivos no banco de dados)
import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
const storage = new GridFsStorage({
    url: mongoUri,
    file: (req, file) => {
        return {
            filename: `_*_*_${file.originalname}`
            // _*_*_ marcador para buscar o índice em fs.files no momento de salvar em "Documentos"
        }
    }
});
const upload = multer({ storage });

// Connect-mongo
var store = MongoStore.create({
    mongoUrl: mongoUri
})

// Express-session + Passport
import session from 'express-session'
import passport from "passport"
import passportConfig from './src/config/auth.js'
passportConfig(passport)

import MongoStore from 'connect-mongo'

app.use(session({
    name: process.env.KEY,
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 10*(60*1000),
        httpOnly: true
    }
}))
app.use(passport.initialize())
app.use(passport.session())

// Middlewares
import middleware from './src/middlewares/middleware.js'
app.use(middleware.global)

// Helpers
import eAdmin from './src/helpers/eAdmin.js'
import eUsuario from './src/helpers/eUsuario.js'

// Routes
import routes from './src/routes/routes.js'
app.use(routes)

// Servidor
const PORT = process.env.PORT || 8081
app.on('connectedDatabase', () => {
    app.listen(PORT, () => {
        console.log(`SERVIDOR: Ativo na porta ${PORT}`)
    })  
})