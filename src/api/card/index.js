const Router = require('express').Router
const bodyParser = require('body-parser')
const card = require('./controller')
const passport = require('passport')
const bodymen = require('bodymen')

const router = new Router()

router.use(passport.initialize());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: false
}))

/**
 * @api {post} /card Create
 * @apiVersion 0.0.1
 * @apiName Create card
 * @apiGroup Card
 * @apiSuccess (Success 201) {String} _id Id of the created card.
 * @apiSuccess (Success 201) {Date} createdAt Time of creation of the card.
 * @apiSuccess (Success 201) {Number} value Initial value of the card. Should be 0.
 * @apiExample {curl} Example usage:
 *     curl localhost:9000/card -v -X POST
 */
router.post('/', passport.session(),
  card.create)

/**
 * @api {get} /card/:id View card
 * @apiVersion 0.0.1
 * @apiName View card
 * @apiGroup Card
 * @apiSuccess (Success 200) {String} _id Id of the created card.
 * @apiSuccess (Success 200) {Number} value Value of the card.
 * @apiError 400 Invalid Id.
 * @apiExample {curl} Example usage:
 *     curl -H 'Content-Type: application/json' localhost:9000/card/CARDID -v
 */
router.get('/:id/', card.view)

/**
 * @api {post} /card/:id/addPoints Add Points
 * @apiDescription Adds (or removes) a certain amount of points from a card's balance. Can only be done by users with appropriate permission or an admin.
 * @apiVersion 0.0.1
 * @apiName Add points
 * @apiGroup Card
 * @apiPermission addPoints
 * @apiPermission admin
 * @apiSuccess (Success 200) {String} _id Id of the card.
 * @apiSuccess (Success 200) {Number} value The latest value of the card.
 * @apiError 400 Invalid Id.
 * @apiExample {curl} Example usage:
 *     curl -H 'Content-Type: application/json' -H 'Cookie: connect.sid=SESSIONTOKEN' -d '{"amount":"-10"}' localhost:9000/card/5e525b662c1e575587b2748c/addPoints -v
 */
router.post('/:id/addPoints', passport.session(), bodymen.middleware({
  amount: Number
}), card.addPoints)


router.use(bodymen.errorHandler)


module.exports = router
