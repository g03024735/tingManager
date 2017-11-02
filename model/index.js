const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = require('mongoose').Schema.Types

const CourseSchema = new Schema({
    title: String,
    subtitle: String,
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
    title: String,
    voice: String,
    duration: Number,
    manuscripts: String,
    publishTime: {
        type: Date,
        default: Date.now
    },
    course: ObjectId
}, {
    collection: 'voice',
    versionKey: false
})

const UserSchema = new mongoose.Schema({
    _id: String,
    lastSign: {type: Date, default: Date.now()},
    status: {type: Number, default: 1},
    ctime: {type: Date, default: Date.now},
    order: [ObjectId]
}, {
    collection: 'user',
    versionKey: false
})

const CommentSchema = new mongoose.Schema({
    userId: String,
    content: String,
    ctime: {type: Date, default: Date.now},
    handle: {type: Boolean, default: false},
    htime: {type: Date}
}, {
    collection: 'comment',
    versionKey: false
})

module.exports = {
    Course: mongoose.model('Course', CourseSchema),
    Voice: mongoose.model('Voice', VoiceSchema),
    User: mongoose.model('User', UserSchema),
    Comment: mongoose.model('Comment', CommentSchema)
}

