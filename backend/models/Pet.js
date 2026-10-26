const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true,
  },

  animal: {
    type: String,
    required: true,
  },

  breed: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  health: {
    type: String,
    required: true,
  },

  vaccination: {
    type: String,
    required: true,
  },

  photo: {
  type: String,
  required: true,
},

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Pet', petSchema)