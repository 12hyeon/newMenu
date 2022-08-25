const mongoose = require('mongoose');

const foodCtgSchema = mongoose.Schema(
  {
    fd_Code: { 
      // D011001 
      // -> D:분류, 01:대분류(1), 10:중분류(10), 01:소분류(1) 
        type: String,
    },
    upper_Fd_Grupp_Nm: { // 대분류
       type: String,
    },
    fd_Grupp_Nm_list: { // 중분류
        type: String,
     },
    fd_Nm: { // 소분류
        type: String,
    },
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('FoodCtg', foodCtgSchema);