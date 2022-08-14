var express = require('express');
var foods = express.Router();

foods.get('/', function(req, res){
    res.write("foods 페이지");
});

module.export = foods;