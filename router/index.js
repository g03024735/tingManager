
module.exports = function (app) {
    require('./course')(app)
    app.get('/', async (req, res) => {
        res.redirect('/course')
    })
}