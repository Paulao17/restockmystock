const express = require('express')
const Router = express.Router
let auth = require('./auth')
let user = require('./user')
let card = require('./card')

let router = new Router()

router.get('/', (req, res) => {
  res.end('ah, yes')
})

router.use('/auth', auth)
router.use('/user', user)
router.use('/card', card)

module.exports = router
