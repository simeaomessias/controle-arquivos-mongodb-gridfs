// Express
import express from 'express'
const router = express.Router();

// Passport
import passport from "passport"
import passportConfig from '../config/auth.js'
passportConfig(passport)

// Controllers
import homeController from '../controllers/homeController.js';

// Home - Login
router.get('/', homeController.telaLogin)
router.post('/', homeController.validaLogin)
router.get('/logout', homeController.logout)

router.get('/logout', (req, res, next) => {

})




export default router