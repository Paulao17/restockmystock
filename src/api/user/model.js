let mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
let Schema = mongoose.Schema
const env = require('../../../config').env

let userSchema = new Schema({
  username: {
    type: String,
    match: /^[a-z0-9]{2,32}$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 2,
    maxlength: 32,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  }
},
{
  timestamps: true
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()

  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view(full) {
    let view = {}
    let fields = ['username']

    if (full) {
      fields = [...fields, 'createdAt']
    }

    fields.forEach((field) => {
      view[field] = this[field]
    })

    return view
  },

  authenticate(password) {
    return bcrypt.compareSync(password, this.password) ? this : false
  }
}


module.exports = mongoose.model('User', userSchema)
