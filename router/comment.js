const Comment = require('../service/comment')

module.exports = function (app) {
    app.get('/comment', async (req, res) => {

        let noHandleComments = await Comment.noHandlelist()
        let handledComments = await Comment.handledList()

        res.render('comment', {
            noHandleComments,
            handledComments
        })
    })

    app.post('/comment', async (req, res) => {
        let {commentId} = req.body
        if (!commentId)
            throw new Error('commentId required')
        await Comment.handle(commentId)
        res.redirect('/comment')
    })
}