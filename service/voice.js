const {Voice} = require('../model')
const {ObjectId} = require('mongoose').Types

module.exports = {
    async create(course) {
    },
    async list(...arg) {
    },
    async find(courseId) {
        return await Voice.find({
            course: ObjectId(courseId)
        })
    }
}