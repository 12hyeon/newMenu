const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { 
      type: String,
      maxLength: 50,
      required: true,
    },
    id: {
      type: String,
      //minLength: 4,
      maxLength: 20,
      unique: 1,
      required: true,
    },
    password: {
      type: String,
      //minLength: 8,
      maxLength: 50,
      required: true,
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
      type: String,
    },
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('Users', userSchema);