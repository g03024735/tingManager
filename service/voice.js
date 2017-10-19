const {Voice} = require('../model')
const {ObjectId} = require('mongoose').Types

module.exports = {
    async create(course) {
        if (typeof course.course === "string")
            course.course = ObjectId(course.course)
        return await Voice.create(course)
    },
    async list(...arg) {
    },
    async find(courseId) {
        return await Voice.find({
            course: ObjectId(courseId)
        })
    }
}