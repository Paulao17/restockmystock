let User = require('./model')

module.exports.sayHi = (req, res, next) => {
  if (req.user)
    res.json(req.user)
  else res.status(403).json({
    no: true
  })
}

module.exports.create = (req, res, next) => {
  if (!req.user) res.status(401).json({valid: false, message: 'Missing authentication'})
  User.create({
      username: req.body.username,
      password: req.body.password
    })
    .then((user) => res.status(201).json(user.view(true)))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'username',
          message: 'username already registered'
        })
      } else {
        next(err)
      }
    })
}

module.exports.viewSelf = (req, res, next) => {
  if (req.user)
    res.json({id: req.user._id, username: req.user.username, roles: req.user.roles})
  else
    res.status(401).json({valid: false, message: 'Missing authentication'})
}
