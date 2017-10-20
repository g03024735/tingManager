module.exports = function (app) {
    require('./course')(app)
    require('./upload')(app)
    require('./user')(app)
    app.get('/', async (req, res) => {
        res.redirect('/course')
    })
}