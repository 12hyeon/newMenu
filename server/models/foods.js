const mongoose = require('mongoose');

const foodSchema = mongoose.Schema(
  {
    fd_Code: { // 소분류별 code
        type: String,
        required: true,
    },
    upper_Fd_Grupp_Nm: { // 대분류
        type: String,
    },
    fd_Grupp_Nm_list: { // 중분류
        type: String,
    },
    fd_Nm : {
        type: String,
    },
    fd_Nm2 : {
        type: String,
    },
    fd_Wgh : {
        type: Number,
    },
    allrgy_Info : {
        type: [String],
    },
    allrgy_Info2 : {
        type: [Number],
    },
    energy_Qy: {
        type: Number,
    },
    prot_Qy: {
        type: Number,
    },
    ntrfs_Qy: {
        type: Number,
    },
    carbohydrate_Qy: {
        type: Number,
    },
    sugar_Qy: {
        type: Number,
    },
    fafref_Qy: {
        type: Number,
    },
    fasatf_Qy: {
        type: Number,
    },
    clci_Qy: {
        type: Number,
    },
    na_Qy : {
        type: Number,
    },
    chole_Qy: {
        type: Number,
    },
    tag: {
        type : [String],
    }
  },
  { versionKey: false }); // __v 제거

module.exports = mongoose.model('Foods', foodSchema);