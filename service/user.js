const {User} = require('../model')
const {ObjectId} = require('mongoose').Types

module.exports = {
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
    async findOne() {

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