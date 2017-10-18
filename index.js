const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const config = require('./config')
const asyncify = require('express-asyncify')

require('mongoose').connect(config.mongoUrl, {useMongoClient: true})
require('mongoose').Promise = global.Promise

const app = asyncify(express());

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./router')(app)
app.use(require('./middleware/logErrors'))
app.use(require('./middleware/errorHandle'))

const server = app.listen(3000, function () {
    let host = server.address().address,
        port = server.address().port

    console.log(`ting Manager listening at http://${host}:${port}`)
})