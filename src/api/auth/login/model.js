const Schema = require('bodymen').Schema;

module.exports = new Schema({
  username: {
    type: String,
    match: /^[a-z0-9]{2,32}$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 2,
    maxlength: 32
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  }
})
