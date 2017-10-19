const {check} = require('express-validator/check')

const course = [
    check('name').trim().exists(),
    check('author').trim().exists(),
    check('cover').trim().isURL(),
    check('description').trim().exists()
]

module.exports = {
    course
}