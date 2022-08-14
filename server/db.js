require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

const express = require('express')
const mongoose = require("mongoose");
const app = express()

var client;

// DB 접속
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log('connected db server!');
});
mongoose.connect(dbAddress);

/*
mongoose.connect(dbAddress, (err, client) => {
      if (err) {
        console.log(err);
      } else {
        client = this.client;
        console.log("DB connected!");
      }
    }
  );
  
module.exports = client;


var DB;
var client = mongoose.connection;
client.on('error', console.error);
client.once('open', function(){
  console.log('connected client server!');
});
mongoose.connect(dbAddress);
DB = client.db("newMenu");

module.exports = DB;
*/