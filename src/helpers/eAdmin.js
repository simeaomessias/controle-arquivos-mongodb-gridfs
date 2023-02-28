export default function eAdmin (req, res, next) {
    if (req.isAuthenticated() && req.user.tipo == "admin") {
        return next()
    }
    res.redirect('/')
}