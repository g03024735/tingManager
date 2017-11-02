module.exports = function (req, res, next) {
    console.log(req.session.user, req.url)
    if(!req.session.user && req.url.indexOf('/login') === -1)
        return res.redirect('/login')
    next();
}