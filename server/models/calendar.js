const mongoose = require('mongoose');

const calendarSchema = mongoose.Schema(
  {
    id: { 
      type: String,
      required: true,
    },
    date: {
      type: Date,
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
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('Calendar', calendarSchema);