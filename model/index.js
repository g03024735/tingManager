const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: String,
    author: String,
    publish: {
        type: Date,
        default: Date.now
    },
    cover: String,
    initial: String,
    description: String,
    putIn: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'course',
    versionKey: false
})

module.exports = {
    Course: mongoose.model('Course', CourseSchema)
}

