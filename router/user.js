const User = require('../service/user')
const Course = require('../service/course')
const {user: userValidator} = require('../middleware/validate')
const {validationResult} = require('express-validator/check')
const {matchedData} = require('express-validator/filter')

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

    app.post('/user', userValidator, async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        let {userId: _id} = matchedData(req)
        await User.create({_id})
        res.redirect(`/user?userId=${_id}`)
    })

    app.post('/user/:userId/course', async (req, res) => {
        let {userId} = req.params
        let {courseId} = req.body

        let course = await Course.findOne(courseId)
        if (!course) {
            throw new Error('course not found')
        }
        await User.addCourse(userId,courseId)
        res.redirect(`/user?userId=${userId}`)
    })
}