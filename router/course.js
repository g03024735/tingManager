const {course: validateCourse, voice: validateVoice} = require('../middleware/validate')
const Course = require('../service/course')
const Voice = require('../service/voice')
const {validationResult} = require('express-validator/check')
const {matchedData} = require('express-validator/filter')

module.exports = function (app) {
    app.post('/course', validateCourse, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        await Course.create(matchedData(req))
        res.redirect('/course')
    })

    app.get('/course', async (req, res) => {
        let courses = await Course.list({})
        res.render('course', {
            courses
        })
    })
    app.get('/course/:courseId/voice', async (req, res) => {
        let {courseId} = req.params

        let course = await Course.findOne(courseId)
        let voices = await Voice.find(courseId)
        res.render('voice', {
            course,
            voices
        })
    })
    app.post('/course/:courseId/voice', validateVoice, async (req, res) => {
        let {courseId} = req.params
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.mapped()});
        }
        
        console.log(matchedData(req))

        await Voice.create(matchedData(req))
        res.redirect(`/course/${courseId}/voice`)
    })
}