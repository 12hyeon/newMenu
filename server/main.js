require('dotenv').config();
var port = process.env.PORT
var dbAddress = process.env.MONGO_URI

var express = require('express')
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express()
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

// middleware
var db = require('./db');
var usersRouter = require('./routes/user');
var foodsRouter = require('./routes/food');
var dietsRouter = require('./routes/diet');

app.use('/users', usersRouter);
app.use('/foods', foodsRouter);
app.use('/diets', dietsRouter);

const FoodCtg = require('./models/food_ctg');
/*
const calc = (i) => {
  var value = '';
    if (i < 10) {
      value = '0'+String(i);
    }
    else {
      value = ''+String(i);
    }
    lr_code = 'D'+ value; 

    FoodCtg.findOne({fd_Code: new RegExp(lr_code)}, 
    (err,ctg) => {
      if (err) return 0;
      else var result = ctg.upper_Fd_Grupp_Nm;
    });
}

// test
app.get('/', async (req, res) => {
  try {
    var lr_list = [];
    var result = null;

  for (var i=1; i<31; i++) {
    let code = calc(i).then(result => {
      return result;
      });
    if (code != 0) {
      lr_list.push(code);
      //lr.list += [code];
    }
    console.log(code);
    
  }
  console.log("실행 완료");
  res.json({
    code:200,
    msg:"대분류 전달 성공",
    lr_ctg : lr_list
  });

  } catch (err) {
    console.log(err);
  }
  //res.send('<h1>newMenu</h1>'+lr_list);
});
*/
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`app is listening on port ${port}`);
});
