require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

var express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var foodRouter = express.Router();
const Users = require('../models/users');
const Foods = require('../models/foods');
const Diets = require('../models/diets');
const FoodCtg = require('../models/food_ctg');

const {PythonShell} = require("python-shell");

// const { Op } = require("sequelize");

foodRouter.use(bodyParser.urlencoded({ extended: true }));
foodRouter.use(bodyParser.json());

// 대분류 선택 : 존재시, lr_ctg로 넘김
foodRouter.get('/search', function(req, res) {
  var sm_list = [];
  Foods.find({ upper_Fd_Grupp_Nm:new RegExp(req.body.lr_ctg), fd_Grupp_Nm_list:new RegExp(req.body.md_ctg), fd_Nm2:new RegExp(req.body.word)},
    (err,ctg) => {
        if (err) {
            res.json({code: 500,msg: '서버 오류'});
        }
        else if (ctg) {
          console.log(ctg);
          for(var i=0; i<ctg.length; i++) {
            sm_list.push({'fd_Code':ctg[i].fd_Code, 'fd_Nm':ctg[i].fd_Nm, 'energy':ctg[i].energy_Qy});
            //console.log(i+":"+ctg[i].fd_Nm);
          }
          res.json({code:200, msg:"검색 성공", sm_ctg:sm_list});
        }
      }
  );
});

/*
// 식단 추천 후 -> word : 소분류명
foodRouter.get('/info', function(req, res) {
  console.log(req.body.word);
  Foods.findOne({ fd_Nm:req.body.word },
    (err,ctg) => {
        if (err) {
            res.json({code: 500,msg: '서버 오류'});
        }
        else if (ctg) {
          res.json({code:200, msg:"영양 정보 전달 성공", sm_ctg:ctg});
          console.log(ctg);
        }
        else {
          res.json({code:400, msg:"영양 정보 전달 실패"});
        }
      }
  );
});
*/

var name = ['userId', 'sex', 'age', 'height', 'weight', 'allergy', 'basal']

// 식단 추천
foodRouter.get('/recom', async function(req, res) {
  Users.findOne({userId : req.body.userId},  (err, usr) => {
    var options = {
      mode: "text",
      scriptPath:'./routes',
      pythonOptions: ["-u"],
      encoding: 'utf-8',
      args: [usr.userId, usr.sex, usr.age, usr.height, usr.weight, usr.allergy, usr.basal, name]
    }
    
    PythonShell.run('test.py', options, function (err, codes) {
      if (err) console.log(err);
      console.log("codes = "+codes);
      var result = [];
      if (codes == null) {
        res.json({msg:400, msg:"식단 추천 실패"});
      }
      else {
        codes.forEach(function (element, index, array) {
          Foods.findOne({fd_Code:element},(err, x) => {
            result.push({'lr_ctg':x.upper_Fd_Grupp_Nm, 'md_ctg':x.fd_Grupp_Nm_list, 'sm_ctg':x.fd_Nm});
            console.log(x.fd_Nm);
            if (array.length == result.length) {
              res.json({msg:200, msg:"식단 추천 성공", data:result});
            }
          });
        });
      }
     });
  });
});

// 식단 영양 정보
foodRouter.get('/info', async function(req, res) {
  Foods.findOne({word : req.body.word},  (err, food) => {
    if (food) {
      res.json({'fd_Nm':food.fd_Nm, 'allrgy_Info':food.allrgy_Info,'energy_Qy':food.energy_Qy,'prot_Qy':food.prot_Qy,'ntrfs_Qy':food.ntrfs_Qy,'carbohydrate_Qy':food.carbohydrate_Qy,'sugar_Qy':food.sugar_Qy,'fafref_Qy':food.fafref_Qy,'fasatf_Qy':food.fasatf_Qy,'clci_Qy':food.clci_Qy,'na_Qy':food.na_Qy,'chole_Qy':food.chole_Qy});
    }
  });
});

module.exports = foodRouter;
