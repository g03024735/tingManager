const User = require('../service/user')

module.exports = function (app) {
    app.get('/user', async (req, res) => {
        let users = await User.simple()
        res.render('user', {
            users
        })
    })
    app.get('/user/:userId', async (req, res) => {
        let {userId} = req.params
        let users = await User.find(userId)
        res.render('user', {
            users
        })
    })
}