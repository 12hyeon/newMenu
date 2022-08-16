const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema(
  {
    name: { 
      type: String,
      maxLength: 20,
      required: true,
    },
    diet: {
        type: [String], // codes
    },
    created:{
        type:Date,
        default:Date.now
    },
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('Schedule', scheduleSchema);