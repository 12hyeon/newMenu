const mongoose = require('mongoose');

const foodSchema = mongoose.Schema(
  {
    fd_Code: { // 소분류별 code
        type: String,
        required: true,
    },
    fd_Nm: { // 소분류
        type: String,
    },
    fd_Wgh: {
        type: Number,
    },
    food_Cnt: {
        type: Number,
    },
    allrgy_Info: {
        type: [String],
    },
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('Foods', foodSchema);