const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const config = require('./config')
const asyncify = require('express-asyncify')

require('mongoose').connect(config.mongoUrl, {useMongoClient: true})
require('mongoose').Promise = global.Promise

const app = asyncify(express());

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({ secret: 'ting Manager', cookie: { maxAge: 60000 * 60 * 6 }}))
app.use(require('./middleware/auth'))
app.use(require('./middleware/logErrors'))
app.use(require('./middleware/errorHandle'))

require('./router')(app)

const server = app.listen(process.env.PORT || 8088, function () {
    let host = server.address().address,
        port = server.address().port

    console.log(`ting Manager listening at http://${host}:${port}`)
    console.log('============  config  ============')
    console.log(config)
    console.log('==================================')
})