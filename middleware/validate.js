const {check} = require('express-validator/check')

const course = [
    check('name').trim().exists(),
    check('author').trim().exists(),
    check('cover').trim().isURL(),
    check('description').trim().exists()
]

const voice = [
    check('stage').trim().toInt().isInt(),
    check('title').trim().exists(),
    check('duration').trim().toInt().isInt(),
    check('fileKey').trim().exists(),
    check('attachKey').trim().exists(),
    check('course').trim().isMongoId()
]

module.exports = {
    course,
    voice
}