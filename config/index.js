module.exports = (function () {
    let env = process.env.NODE_ENV || 'local'
    return require(`./config.${env}.js`)
})()