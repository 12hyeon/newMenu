require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

var express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var foodRouter = express.Router();
const Foods = require('../models/foods');
const FoodCtg = require('../models/food_ctg');
// const { Op } = require("sequelize");

foodRouter.use(bodyParser.urlencoded({ extended: true }));
foodRouter.use(bodyParser.json());

foodRouter.get('/search', function(req, res) {
  var sm_list = [];
  FoodCtg.find({ fd_Nm :new RegExp(req.body.word)},
    (err,ctg) => {
        if (err) {
            res.json({code: 500,msg: '서버 오류'});
        }
        else if (ctg) {
          for(var i=0; i<ctg.length; i++) {
            sm_list.push(ctg[i].fd_Nm);
            //console.log(i+":"+ctg[i].fd_Nm);
          }
          res.json({code:200, msg:"검색 성공", sm_ctg:sm_list});
          console.log("sm_ctg = "+sm_list);
        }
      }
  );
});


module.exports = foodRouter;
