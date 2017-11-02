module.exports = function (req, res, next) {
    if(!req.session.user && req.url.indexOf('/login') === -1)
        return res.redirect('/login')
    next();
}