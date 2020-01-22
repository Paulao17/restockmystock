const Router = require('express').Router
const bodyParser = require('body-parser')
const bodymen = require('bodymen')
const model = require('./model')
const controller = require('./controller')
const passport = require('passport')

let router = new Router()

router.use(bodyParser.json())
router.post('/',bodymen.middleware(model), passport.authenticate('login'), controller.sayHi)

router.use(bodymen.errorHandler())

module.exports = router
