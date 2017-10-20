const {Comment} = require('../model')
const {ObjectId} = require('mongoose').Types

module.exports = {
    async noHandlelist() {
        return await Comment.find({
            handle: false,
        }).sort({
            ctime: 1
        })
    },
    async handledList() {
        return await Comment.find({
            handle: true,
        }).sort({
            htime: -1
        }).limit(20)
    },
    async handle(_id) {
        return await Comment.findOneAndUpdate({
            _id: ObjectId(_id)
        }, {
            $set: {
                handle: true,
                htime: new Date()
            }
        })
    }
}