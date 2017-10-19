const pinyin = require('pinyin')
const {Course} = require('../model')
const {ObjectId} = require('mongoose').Types

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
    },
    async findOne(courseId) {
        return await Course.findOne({
            _id: ObjectId(courseId)
        })
    }
}