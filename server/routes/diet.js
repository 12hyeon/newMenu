require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

var express = require('express');
const bodyParser = require("body-parser");
var dietRouter = express.Router();
dietRouter.use(bodyParser.urlencoded({ extended: true }));
dietRouter.use(bodyParser.json());
const Diets = require('../models/diets');
const Foods = require('../models/foods');


// /diets :id 보내서 저장된 내용 불러들이기 : userId = date("22-8-18")
dietRouter.get('/', function(req, res) {
  Diets.findOne({ userId: req.body.userId, date: req.body.date },
    (err,diet) => {
      if (err) {
        res.send('server error');
      }
      else if (diet) {
          res.json({code: 200, msg: '식단 정보 전달',
          data: {break_diet: diet.break_diet, lunch_diet:diet.lunch_diet, dinner_diet: diet.dinner_diet, total_energy:total_energy}});
      }
      else{
          res.json({code: 400, msg: '식단 데이터 없음'});
      }
  });
});


// 식단 저장 - id, date, break, lunch, dinner_diet + energy
dietRouter.post('/', async function(req, res) {
  // var d = new Date(); // 오늘
  // console.log("new Date() = " + d);

  var new_diet = new Diets(req.body); // param 확인 필요
  
  var result = [0,0,0];
  var name = new_diet.break_diet + new_diet.lunch_diet + new_diet.dinner_diet;
  var i = new_diet.break_diet.length + new_diet.lunch_diet.length + new_diet.dinner_diet.length;
  console.log("cnt : "+i);
  console.log("list :"+name);
  /*
  new_diet.break_diet.forEach(function (element, index, array) {
    Foods.findOne({fd_Nm:element},(err, x) => {
      result += x.energy;
      console.log(x.fd_Nm);
      if (array.length == result.length) {
        res.json({msg:200, data:result});
      }
    });*/
    new_diet.total_energy = new_diet.break_energy + new_diet.lunch_energy + new_diet.dinner_energy;
  console.log(new_diet);
  
  new_diet.save((err) => {
    if (err) {
      res.json({ code:500, msg: '식단 저장 실패' });
    }
    else {
      res.json({ code:200, msg: '식단 저장 성공', data: new_diet});
    }
  });
});

module.exports = dietRouter;
