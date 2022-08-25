require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

const express = require('express')
const mongoose = require("mongoose");
const app = express()
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

// test
app.get('/', (req, res) => {
  res.send('<h1>newMenu</h1>');
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`app is listening on port ${port}`);
});