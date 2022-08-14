require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

const express = require('express')
const mongoose = require("mongoose");
const app = express()

// middleware
var usersRouter = require('./routes/users');
app.use('/users', usersRouter);
var db = require('./db');


// test
app.get('/', (req, res) => {
  res.send('<h1>newMenu</h1>');
});


app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`app is listening on port ${port}`);
});