require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

var express = require('express');
const bodyParser = require("body-parser");
var dietRouter = express.Router();
dietRouter.use(bodyParser.urlencoded({ extended: true }));
dietRouter.use(bodyParser.json());
const Diets = require('../models/diets');


// /diets :id 보내서 저장된 내용 불러들이기 : userId = date("22-08-18")
dietRouter.get('/', function(req, res) {
    Diets.findOne({ userId: req.body.userId, date: req.body.date },
      (err,diet) => {
        if (err) {
          res.send('server error');
        }
        else if (diet) {
            res.json({code: 200, msg: '식단 정보 전달',
            data: {break_diet: diet.break_diet, lunch_diet:diet.lunch_diet, dinner_diet: diet.dinner_diet}});
        }
        else{
            res.json({code: 400, msg: '식단 데이터 없음'});
        }
    });
});


// 식단 저장 - id, date, break_diet, lunch_diet, dinner_diet
dietRouter.post('/', async function(req, res) {
    var d = new Date(); // 오늘
    console.log("new Date() = " + d);

    var new_diet = new Diets(req.body);
    console.log(new_diet);

	new_diet.save((err) => {
		if (err) return res.json({ code:500, msg: '식단 저장 실패' });
		else return res.json({ code:200, msg: '식단 저장 성공', data: new_diet});
	});
    console.log("식단 저장 성공!");
})


module.exports = dietRouter;
