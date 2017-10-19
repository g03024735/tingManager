const multer = require('multer')
const request = require('request-promise')
const sign = require('../lib/sign')
const fs = require('fs')
const path = require('path')
const {OSS} = require('../config')
const base64url = require('base64url')

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), 'uploads'))
        },
        filename: function (req, file, cb) {
            cb(null, (Math.random() + "").slice(2, 15) + path.extname(file.originalname))
        }
    })
})

module.exports = function (app) {
    app.get('/upload', async (req, res) => {
        const {query} = req
        if (query.link)
            query.link = base64url.decode(query.link)

        res.render('upload', query)
    })

    app.post('/upload', upload.single('file'), async (req, res) => {
        const {file} = req

        if (!file)
            return res.send('need file')

        //get upload url
        let {key, expire} = req.body
        expire = parseInt(expire)
        if (isNaN(expire))
            return res.send('expire is NaN')

        if (expire > 0)
            expire += Date.now()

        let url = `${OSS.domain}:${OSS.port}/upload?expire=0&filename=${key}`
        url = sign(url, OSS.secretKey).getSignHref()


        //upload oss
        let body = await request.post({
            url,
            formData: {
                files: fs.createReadStream(file.path)
            }
        })

        //redirect upload?link=xxx
        let accessUrl = sign(`${OSS.domain}:${OSS.port}/${key}?expire=${expire}&timestamp=${Date.now()}`, OSS.secretKey).getSignHref()
        res.redirect(`/upload?link=${base64url(accessUrl)}`)
    })
}