if (process.env.NODE_ENV === 'production') {
    module.exports = require('./AppWrap')
} else {
    module.exports = require('./AppWrap.dev')
}