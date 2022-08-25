require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

var express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var foodRouter = express.Router();
// const Foods = require('../models/foods');
const FoodCtg = require('../models/food_ctg');

foodRouter.use(bodyParser.urlencoded({ extended: true }));
foodRouter.use(bodyParser.json());

const { Op } = require("sequelize");

// /foods
foodRouter.get('/', async function(req, res) {
  var start_c = "D";
  var end_c = "1001";
  var code = "";
  var lr_list = [];

  for (let i = 1; i <= 5; i++) {
      if (i < 10) {
        value ="0"+i;
      } else {
        value = ""+i;
      }
      code = start_c + value;
      console.log(code);
      FoodCtg.findOne({ attributes:['fd_Code'], where:{[Op.startsWith]:code}},
        (err,ctg) => {
            if (err) {
                res.json({
                    code: 500,
                    msg: '서버 오류'
                });
            }
            else if (ctg) {
                lr_list.push(ctg.upper_Fd_Grupp_Nm);
                console.log(i+" "+ctg);
            }
            else {
              console.log(i+" "+code + "식품 없음");
            }
          }
      );
      code = "";
      value = "";
  }

  console.log(lr_list[-1]);

  if (lr_list.length < 1) {
    res.json({
        code:400,
        msg:"대분류 전달 실패",
        lr_ctg : lr_list
    });
    console.log("대분류 전달 실패");
    }
    else {
        res.json({
            code:200,
            msg:"대분류 전달 성공",
            lr_ctg : lr_list
        });
        console.log("대분류 전달 성공");
    }
});

module.exports = foodRouter;