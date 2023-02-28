export default function eAdmin (req, res, next) {
    if (req.isAuthenticated() && req.user.tipo == "usuario") {
        return next()
    }
    res.redirect('/')
}