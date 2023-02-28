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

// Connect-mongo
var store = MongoStore.create({
    mongoUrl: mongoUri
})

// Express-session
import session from 'express-session'
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

// Middlewares
import middleware from './src/middlewares/middleware.js'
app.use(middleware.global)

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