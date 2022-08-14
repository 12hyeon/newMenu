var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.write("index");
});

module.exports = router;
