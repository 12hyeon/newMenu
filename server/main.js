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

app.get("/", (req, res) => {
  res.json({msg:"app"});
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`app is listening on port ${port}`);
});
