const mongoose = require('mongoose')

const adoptionApplicationSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },

  hadPetsBefore: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model(
  'AdoptionApplication',
  adoptionApplicationSchema
)