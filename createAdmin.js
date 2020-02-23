const config = require('./config')
let mongoose = require('mongoose')
let User = require('./src/api/user/model.js')

mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = Promise
User.create({username: 'admin', password:'aRealPasswordForOnce', roles:['admin']})

setTimeout(() => {
  mongoose.disconnect()
}, 1000)
