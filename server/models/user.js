const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { 
      type: String,
      maxLength: 20,
      required: true,
    },
    id: {
      type: String,
      maxLength: 20,
      unique: 1,
      required: true,
    },
    password: {
      type: String,
      //minLength: 8,
      maxLength: 20,
      required: true,
    },
    sex: {
      type:Number, // 남자:1 / 여자:2
    },
    age: {
      type:Number,
    },
    email: {
      type: String,
      //required: true,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    allergy: {
      type: String, // 당뇨병 or 없음
      // 알레르기 추가시, [String] 타입
    },
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('Users', userSchema);