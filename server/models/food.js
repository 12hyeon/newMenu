const mongoose = require('mongoose');

const foodSchema = mongoose.Schema(
  {
    no: {
        type: Number,
    },
    fd_Code: { 
        type: String,
        required: true,
    },
    upper_Fd_Grupp_Nm: {
       type: String,
    },
    fd_Nm: {
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
    food_List_Name: {
        type: String,
    },
    food_List_Code: {
        type: [String],
    },
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('Foods', userSchema);