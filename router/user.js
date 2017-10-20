const User = require('../service/user')
const Course = require('../service/course')

module.exports = function (app) {
    app.get('/user', async (req, res) => {
        let {userId} = req.query
        let users
        if (userId)
            users = await User.find(userId)
        else
            users = await User.simple()

        res.render('user', {
            users
        })
    })
    app.post('/user/:userId/course', async (req, res) => {
        let {userId} = req.params
        let {courseId} = req.body

        let course = await Course.findOne(courseId)
        if (!course) {
            throw new Error('course not found')
        }
        res.redirect(`/user?userId=${userId}`)
    })
}