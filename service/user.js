const {User} = require('../model')
const {ObjectId} = require('mongoose').Types

module.exports = {
    async create(user) {
        return await User.create(user)
    },
    async find(userId) {
        return await User.find({
            _id: userId
        })
    },
    async simple() {
        return await User.aggregate(
            [
                {$sample: {size: 10}},
            ]
        )
    },
    async addCourse(_id, course) {
        return await User.findOneAndUpdate(
            {_id},
            {
                $addToSet: {
                    order: ObjectId(course)
                }
            }
        )
    }
}