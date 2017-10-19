
module.exports = function (app) {
    require('./course')(app)
    require('./upload')(app)
    app.get('/', async (req, res) => {
        res.redirect('/course')
    })
}