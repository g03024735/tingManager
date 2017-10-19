const pinyin = require('pinyin')
const {Course} = require('../model')

module.exports = {
    async create(course) {
        let initial = (pinyin(course.name, {
            style: pinyin.STYLE_FIRST_LETTER,
            heteronym: false
        }))[0][0].toUpperCase()
        course.initial = initial
        return await Course.create(course)
    },
    async list(...arg) {
        return await Course.find(...arg)
    }
}