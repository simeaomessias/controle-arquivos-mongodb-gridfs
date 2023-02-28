// Express
import express from 'express'
const router = express.Router();

// Passport
import passport from "passport"
import passportConfig from '../config/auth.js'
passportConfig(passport)

// Helpers
import eAdmin from '../helpers/eAdmin.js'
import eUsuario from '../helpers/eUsuario.js'

// Controllers
import homeController from '../controllers/homeController.js';
import adminController from '../controllers/adminController.js';

// Home - Login
router.get('/', homeController.telaLogin)
router.post('/', homeController.validaLogin)
router.get('/logout', homeController.logout)

// Administrador
router.get('/admin', eAdmin, adminController.adminHome)
router.get('/admin/listar-usuarios', eAdmin, adminController.listarUsuarios)
router.get('/admin/cadastrar-usuario', eAdmin, adminController.telaCadastroUsuario)
router.post('/admin/cadastrar-usuario', eAdmin, adminController.cadastrarUsuario)
router.get('/admin/editar-usuario/:id', eAdmin, adminController.telaEdicaoUsuario)


export default router