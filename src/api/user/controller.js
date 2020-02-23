let User = require('./model')

module.exports.sayHi = (req, res, next) => {
  if (req.user)
    res.json(req.user)
  else res.status(403).json({
    no: true
  })
}

module.exports.create = (req, res, next) => {
  if (!req.user) return res.status(401).json({
    valid: false,
    message: 'Missing authentication'
  })
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
    res.json(req.user.view(true))
  else
    res.status(401).json({
      valid: false,
      message: 'Missing authentication'
    })
}

module.exports.addRole = (req, res, next) => {
  if (!req.user) return res.status(401).json({
    valid: false,
    message: 'Missing authentication'
  })
  if ((!(req.user.hasRole('addRoles') || req.user.hasRole('admin'))) || (req.body.role === 'admin' && !req.user.hasRole('admin')))
    return res.status(403).json({
      valid: false,
      message: 'Missing permission'
    })

  User.findOne({
      username: req.params.username
    })
    .then((user) => {
      if (!user) return res.status(404).json({
        valid: false,
        message: 'Inexistant user'
      })

      user.roles.push(req.body.role)
      user.save()
      res.json({
        roles: user.roles
      })
    })
    .catch(next)
}

module.exports.removeRole = (req, res, next) => {
  if (!req.user) return res.status(401).json({
    valid: false,
    message: 'Missing authentication'
  })
  if ((!(req.user.hasRole('addRoles') || req.user.hasRole('admin'))) || (req.body.role === 'admin' && !req.user.hasRole('admin')))
    return res.status(403).json({
      valid: false,
      message: 'Missing permission'
    })

  User.findOne({
      username: req.params.username
    })
    .then((user) => {
      if (!user) return res.status(404).json({
        valid: false,
        message: 'Inexistant user'
      })

      if (user.roles.includes(req.body.role)) {
        user.roles.splice(user.roles.indexOf(req.body.role), 1);
      }
      user.save()
      res.json({
        roles: user.roles
      })
    })
    .catch(next)
}
