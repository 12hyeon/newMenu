const mongoose = require('mongoose');

const dietSchema = mongoose.Schema(
  {
    userId: { 
      type: String,
      required: true,
    },
    date: {
      type: String, // Date
      required: true,
    },
    break_diet: {
      type: [String],
    },
    lunch_diet: {
      type: [String],
    },
    dinner_diet: {
      type: [String],
    },
    break_energy : {
      type : Number,
      default: 0,
    },
    lunch_energy : {
      type : Number,
      default: 0,
    },
    dinner_energy : {
      type : Number,
      default: 0,
    },
    total_energy : {
      type : Number,
      default: 0,
    },
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('Diets', dietSchema);