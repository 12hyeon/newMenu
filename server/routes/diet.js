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
          data: {break_diet: diet.break_diet,
             lunch_diet:diet.lunch_diet, dinner_diet: diet.dinner_diet, total_energy:diet.total_energy}});
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

  Diets.findOne({ userId: req.body.userId, date: req.body.date },
    (err,diet) => {
      var n = new Diets(req.body);

      if (err) {
        res.send('수정 서버 오류');
      }
      else if (diet) { // 수정되는지, save 해야하는지
        if (n.break_diet != []) {
          diet.break_diet = req.body.break_diet;
          diet.break_energy = req.body.break_energy;
        }
        if (n.lunch_diet != []) {
          diet.lunch_diet = req.body.lunch_diet;
          diet.lunch_energy = req.body.lunch_energy;
        }
        if (n.dinner_diet != []) {
          diet.dinner_diet = req.body.dinner_diet;
          diet.dinner_energy = req.body.dinner_energy;
        }
        n.total_energy = n.break_energy + n.lunch_energy + n.dinner_energy;
        res.json({ code:200, msg: '식단 수정 성공', data: n});
        console.log(n);
      }
      else{
        n.total_energy = n.break_energy + n.lunch_energy + n.dinner_energy;
        console.log(n);
  
        n.save((err) => {
          if (err) {
            res.json({ code:500, msg: '식단 저장 실패' });
          }
          else {
            res.json({ code:200, msg: '식단 저장 성공', data: n});
          }
        });
      }
  });
});

module.exports = dietRouter;
