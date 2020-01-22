const express = require('express')
const bodyParser = require('body-parser')
const env = require('../../../config').env
const passport = require('passport')
const redis = require('redis')
const session = require('express-session')


module.exports = (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    //app.use(cors())
    //app.use(compression())
    //app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  let RedisStore = require('connect-redis')(session)
  let redisClient = redis.createClient()

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'ah yes',  // TODO config.secret,
      resave: false,
    })
  )
  app.use(bodyParser.json({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(apiRoot, routes)
  //app.use(queryErrorHandler())
  //app.use(bodyErrorHandler())

  return app
}
