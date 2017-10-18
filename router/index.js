module.exports = function (app) {
    app.get('/', async (req, res) => {
        res.render('index', {message: 'Hello World'})
    })
}