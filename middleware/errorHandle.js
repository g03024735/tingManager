module.exports = function (err, req, res, next) {
    let status = err.status || 500
    res.status(status).send({error: err.message})
}