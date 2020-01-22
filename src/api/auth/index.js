const Router = require('express').Router

let login = require('./login')

let router = new Router()

router.use('/login', login)

module.exports = router
