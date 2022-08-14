require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = express.Router();

// const querystring = require('querystring');
const Users = require('../models/user');
userRouter.use(bodyParser.urlencoded({ extended: true }));
userRouter.use(bodyParser.json());

userRouter.get('/', function(req, res, next) {

});

// 로그인
userRouter.get("/login", function(req, res){
  // 로그인 페이지 연동
  //res.sendFile(path.join(__dirname , "../public/login.html"));
});

// 회원 가입 - 추가 : pw 암호화 전달 & user 스키마 조건
//const pbkdf2Password = require("pbkdf2-password");
//var hasher = pbkdf2Password();
userRouter.post('/join', async function(req,res){
  var new_user = new Users(req.body);
  // + id, pw, email 등 조건 확인
	new_user.save((err) => {
		if (err) return res.status(500).json({ message: '회원가입 실패' });
		else return res.status(200).json({ message: '회원가입 성공', data: new_user });
	});
});

// 중복 id 확인
userRouter.post('/signin', (req, res) => {
	Users.findOne({ id: req.body.id}, (err, user) => {
		if (err) return res.status(500).json({ message: '에러!' });
		else if (user) return res.status(200).json({ message: '사용중인 id', data: user });
		else return res.status(404).json({ message: '사용 가능 id' });
	});
});

/* 동기 방식
userRouter.post('/signin', (req, res) => {
	let result = await Users.findOne({ id: req.body.id});
  if (!result) {
    return res.status(500).json({ message: '에러!' });
  }
  else {
    return res.status(200).json({ message: '사용중인 id', data: user });
  }
});
*/

// url : /userRouter/123
// req.params="id" & req.query=123 
// 회원 수정
userRouter.post('/:id',function(req, res, next){
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
  res.write("id = "+req.params.id);
  res.end();
});

module.exports = userRouter;
