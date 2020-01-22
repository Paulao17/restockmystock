const Router = require('express').Router
const bodyParser = require('body-parser')
const user = require('./controller')
const bodymen = require('bodymen')
const schema = require('./model').schema.tree
const passport = require('passport')

const router = new Router()

router.use(passport.initialize());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/',
  user.sayHi)

/**
 * @api {post} /user Create
 * @apiVersion 0.0.1
 * @apiName Create user
 * @apiGroup User
 * @apiParam {String{2..32}} username The username of the user to create.
 * @apiParam {String{6..128}} password The password of the user to create.
 * @apiSuccess (Success 201) {String} username Username of the created user.
 * @apiSuccess (Success 201) {Date} createdAt Time of creation of the user.
 * @apiError 400 Invalid parameters.
 * @apiError 409 User already exists.
 * @apiExample {curl} Example usage:
 *     curl -H 'Content-Type: application/json' -d '{"username":"foo","password":"bar123"}' localhost:9000/user -v
*/
router.post('/',
  bodymen.middleware(schema),
  user.create)

router.use(bodymen.errorHandler)

module.exports = router
