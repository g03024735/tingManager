const {User} = require('../model')

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
    async addCourse() {

    }
}