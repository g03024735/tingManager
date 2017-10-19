const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = require('mongoose').Schema.Types

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

const VoiceSchema = new mongoose.Schema({
    stage: Number,
    title: String,
    duration: Number,
    fileKey: String,
    attachKey: String,
    publishTime: {
        type: Date,
        default: Date.now
    },
    course: ObjectId
}, {
    collection: 'voice',
    versionKey: false
})


module.exports = {
    Course: mongoose.model('Course', CourseSchema),
    Voice: mongoose.model('Voice', VoiceSchema)
}

