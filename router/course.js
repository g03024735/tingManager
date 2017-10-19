const {course: validateCourse} = require('../middleware/validate')
const Course = require('../service/course')
const {validationResult} = require('express-validator/check')
const {matchedData} = require('express-validator/filter')

module.exports = function (app) {
    app.post('/course', validateCourse, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        Course.create(matchedData(req))
        res.redirect('/course')
    })

    app.get('/course', async (req, res) => {
        let courses = await Course.list({})
        res.render('course', {
            courses
        })
    })
}