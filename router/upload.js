const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const request = require('request-promise')
const sign = require('../lib/sign')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const {OSS} = require('../config')

module.exports = function (app) {
    app.get('/upload', async (req, res) => {
        res.render('upload', {})
    })

    app.post('/upload', upload.single('file'), async (req, res) => {
        const {file} = req

        if (!file)
            return res.send('need file')

        let {key, expire, filename} = req.body
        expire = parseInt(expire)
        if (isNaN(expire))
            return res.send('expire is Nan')

        if (expire > 0)
            expire += Date.now()

        let url = `${OSS.domain}:${OSS.port}/upload?expire=${expire}&filename=${key}`
        url = sign(url, OSS.secretKey).getSignHref()

        let response = await request.post({
            url,
            formData: {
                files: fs.createReadStream(path.join(process.cwd(), file.path))
            }
        })

        console.log(response)
        res.send('sss')
    })
}