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
  res.write("users 페이지 잔입");
});

// 로그인
userRouter.post("/login", function(req, res){
  Users.findOne({ id: req.body.id, password: req.body.password },
    (err,user) => {
      if (err){
        const err_result = {
            code: 500,
            msg: 'server error'
        };
        res.send(err_result);
      }
      else if(user) {
          const result = {
              code: 200,
              msg: '로그인 성공',
              user: user
          };
          res.send(result);
      }
      else{
          const f_result = {
              code: 400,
              msg: '로그인 실패'
              // 실패 이유가 id, pw 중 어떤 문제인지 출력 필요
              // if) 해당 id 존재 여부 확인 -> 비밀번호 확인 
          };
          res.send(f_result);
      }
  });
});


// 회원 가입 - 추가 : pw 암호화 전달 & user 스키마 조건
//const pbkdf2Password = require("pbkdf2-password");
//var hasher = pbkdf2Password();
userRouter.post('/join', async function(req,res){
  var new_user = new Users(req.body);

  if (new_user.id.length < 8) {
    return res.json({ message: '회원가입 실패 - id길이가 8미만' });
  }

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

// url : /userRouter/(id) + json-"password":"(pw)"/변경정보 
// req.params="id" & req.params.id=123 
// 회원 수정 - 로그인된 경우만 진입할 수 있게 
// json 전달 : pw, new_pw 등(id 제외 모두 - id는 주소로 전달)
userRouter.post('/:id',function(req, res, next){
  Users.findOne({ id: req.params.id, password: req.body.password },
    (err,user) => {
      if (err) {
        res.send('server error');
      }
      else if (user) {
        user.password = req.body.new_password;
        user.name = req.body.name;
        user.email = req.body.email;
        const result = {
            code: 200,
            msg: '회원정보 수정 성공',
            user: user
        };
        res.send(result);
      }
      else{
          const f_result = {
              code: 400,
              msg: '회원정보 수정 실패'
          };
          res.send(f_result);
      }
  });
});

module.exports = userRouter;
