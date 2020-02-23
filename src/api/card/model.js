let mongoose = require('mongoose')
let Schema = mongoose.Schema

let cardSchema = new Schema({
  value: {
    type: Number,
    required: false,
    default: 0,
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 128
  }
},
{
  timestamps: true
});

cardSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()

  const rounds = env === 'test' ? 1 : 5

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

cardSchema.methods = {
  view(full) {
    let view = {}
    let fields = ['_id', 'value']

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


module.exports = mongoose.model('Card', cardSchema)
