const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { 
      type: String,
      maxLength: 20,
      required: true,
    },
    userId: {
      type: String,
      maxLength: 20,
      unique: 1,
      required: true,
    },
    userPassword: {
      type: String,
      //minLength: 8,
      maxLength: 20,
      required: true,
    },
    email: {
      type: String,
      //required: true,
    },
    sex: {
      type:Number, // 남자:1 / 여자:2
    },
    age: {
      type:Number,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    allergy: {
      type: [Number],
    },
    // 기초대사량
    basal: {
      type: Number,
    },
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('Users', userSchema);