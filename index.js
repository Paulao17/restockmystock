let http = require('http')
const config = require('./config')
let mongoose = require('mongoose')
let express = require('./src/services/express')
require('./src/services/passport')
let passport = require('passport');
let api = require('./src/api')

const app = express('', api)





mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise

//redis.connect()


const server = http.createServer(app)

setImmediate(() => {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', config.ip, config.port, config.env)
  })
})

module.exports = app
