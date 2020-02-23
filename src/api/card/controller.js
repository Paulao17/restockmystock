let Card = require('./model')

module.exports.create = function (req, res, next) {
  Card.create({value: 0})
    .then((card) => res.status(201).json(card.view(true)))
    .catch((err) => {
        next(err)
    })
}

module.exports.view = function (req, res, next) {
  Card.findOne({_id: req.params.id})
    .then((card) => res.json(card.view()))
    .catch((err) => {
      if (err.name === 'CastError')
        res.status(400).json({
          valid: false,
          param: 'id',
          message: 'Invalid id'
        })
      else next()
    })
}

module.exports.addPoints = function (req, res, next) {
  if (!req.user) return res.status(401).json({valid: false, message: 'Missing authentication'})
  if (!(req.user.hasRole('addPoints') || req.user.hasRole('admin'))) return res.status(403).json({valid: false, message: 'Missing permission'})
  req.body.amount = parseFloat(req.body.amount) // TODO no negative values?
  Card.findOne({_id: req.params.id})
    .then((card) => {
      if (card.value == undefined)
        card.value = req.body.amount
      else card.value += req.body.amount

      card.save()
      res.json(card.view())
    })
    .catch(next)
}
