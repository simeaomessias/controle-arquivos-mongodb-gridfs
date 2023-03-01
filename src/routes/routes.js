// Express
import express from 'express'
const router = express.Router();

// Passport
import passport from "passport"
import passportConfig from '../config/auth.js'
passportConfig(passport)

// Multer-Gridfs-Storage (para fazer upload e salvar arquivos no banco de dados)
// Multer
import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
const storage = new GridFsStorage({
    url: process.env.MONGOURI,
    file: (req, file) => {
        return {
            filename: `_*_*_${file.originalname}`
            // _*_*_ marcador para buscar o índice em fs.files no momento de salvar em "Documentos"
        }
    }
});
const upload = multer({ storage });

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

// Administrador - Usuários
router.get('/admin', eAdmin, adminController.adminHome)
router.get('/admin/listar-usuarios', eAdmin, adminController.listarUsuarios)
router.get('/admin/cadastrar-usuario', eAdmin, adminController.telaCadastroUsuario)
router.post('/admin/cadastrar-usuario', eAdmin, adminController.cadastrarUsuario)
router.get('/admin/editar-usuario/:id', eAdmin, adminController.telaEdicaoUsuario)
router.post('/admin/editar-usuario/:id', eAdmin, adminController.editarUsuario)

// Administrador - Documentos
router.get('/admin/listar-documentos', eAdmin, adminController.listarDocumentos)
router.get('/admin/cadastrar-documento', eAdmin, adminController.telaCadastroDocumento)
router.post('/admin/cadastrar-documento', eAdmin, upload.single('file'), adminController.cadastrarDocumento)
router.get('/admin/editar-documento/:id', eAdmin, adminController.telaEdicaoDocumento)
router.post('/admin/editar-documento/:id', eAdmin, adminController.editarDocumento)

export default router