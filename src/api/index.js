const Router = require('express').Router
let auth = require('./auth')
let user = require('./user')

let router = new Router()

router.get('/', (req, res) => {
  res.end('ah, yes')
})

router.use('/auth', auth)
router.use('/user', user)

module.exports = router
