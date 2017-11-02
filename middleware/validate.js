const {check} = require('express-validator/check')

const course = [
    check('title').trim().exists(),
    check('subtitle').trim().exists(),
    check('author').trim().exists(),
    check('cover').trim().isURL(),
    check('description').trim().exists()
]

const voice = [
    check('title').trim().exists(),
    check('duration').trim(),
    check('voice').trim(),
    check('manuscripts').trim(),
    check('course').trim().isMongoId()
]

const user = [
    check('userId').trim().isLength({min: 30})
]

module.exports = {
    course,
    voice,
    user
}