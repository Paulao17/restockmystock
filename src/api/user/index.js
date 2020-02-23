const Router = require('express').Router
const bodyParser = require('body-parser')
const user = require('./controller')
const bodymen = require('bodymen')
const schema = require('./model').schema.tree
const passport = require('passport')

const router = new Router()

router.use(passport.initialize());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: false
}))

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
router.post('/', passport.session(),
  bodymen.middleware(schema),
  user.create)

/**
 * @api {get} /user/me View self
 * @apiVersion 0.0.1
 * @apiName View self
 * @apiGroup User
 * @apiSuccess (Success 200) {String} username Username of the user.
 * @apiSuccess (Success 200) {String} _id Id of the user.
 * @apiSuccess (Success 200) {Array} roles Roles of the user.
 * @apiError 400 Invalid parameters.
 * @apiError 401 Missing authentication.
 * @apiExample {curl} Example usage:
 *     curl -H 'Content-Type: application/json' -H 'Cookie: connect.sid=SESSIONTOKEN'  localhost:9000/user/me -v
 */
router.get('/me', passport.session(), user.viewSelf)

/**
 * @api {post} /user/:username/roles Add role
 * @apiDescription Adds a role to a user. Note that the admin role can only be added by a user with the admin role
 * @apiVersion 0.0.1
 * @apiName Add role
 * @apiGroup User
 * @apiPermission addRoles
 * @apiPermission admin
 * @apiParam {String} username The role to add to the user
 * @apiSuccess (Success 200) {Array} roles The updated list of the user's roles.
 * @apiError 400 Invalid parameters.
 * @apiError 401 Missing authentication.
 * @apiExample {curl} Example usage:
 *     curl -H 'Content-Type: application/json' -H 'Cookie: connect.sid=SESSIONTOKEN' -d '{"role":"addPoints"}' localhost:9000/user/foo/roles -v
 */
router.post('/:username/roles', passport.session(), bodymen.middleware({role: String}), user.addRole)

/**
 * @api {delete} /user/:username/roles Remove role
 * @apiDescription Removes a role from a user. Note that the admin role can only be removed by a user with the admin role
 * @apiVersion 0.0.1
 * @apiName Remove role
 * @apiGroup User
 * @apiPermission addRoles
 * @apiPermission admin
 * @apiParam {String} username The role to remove from the user
 * @apiSuccess (Success 200) {Array} roles The updated list of the user's roles.
 * @apiError 400 Invalid parameters.
 * @apiError 401 Missing authentication.
 * @apiExample {curl} Example usage:
 *     curl -H 'Content-Type: application/json' -H 'Cookie: connect.sid=SESSIONTOKEN' -d '{"role":"addPoints"}' -X DELETE localhost:9000/user/foo/roles -v
 */
router.delete('/:username/roles', passport.session(), bodymen.middleware({role: String}), user.removeRole)

router.use(bodymen.errorHandler)

module.exports = router
