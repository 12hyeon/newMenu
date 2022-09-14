require('dotenv').config();
const port = process.env.PORT
const dbAddress = process.env.MONGO_URI

const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = express.Router();
const Users = require('../models/users');
const Foods = require('../models/foods');
const {PythonShell} = require("python-shell");

userRouter.use(bodyParser.urlencoded({ extended: true }));
userRouter.use(bodyParser.json());

/*
userRouter.get('/', function(req, res, next) {
  res.write("users 페이지 잔입");
});
*/


var name = ['userId', 'sex', 'age', 'height', 'weight', 'allergy', 'basal']

// 로그인
userRouter.post("/login", async function(req, res) {
  console.log(req.body);
  console.log(req.body.userId);
  Users.findOne({ userId: req.body.userId, userPassword: req.body.userPassword },
    (err,user) => {
      if (err) {
        res.status(500).json({
          msg: 'server error'
        });
      }
      else if (user) {
        console.log('로그인 시작');
        Users.findOne({userId : req.body.userId},  (err, usr) => {
          
          var options = {
            mode: "text",
            scriptPath:'./routes',
            pythonOptions: ["-u"],
            encoding: 'utf-8',
            args: [usr.userId, usr.sex, usr.age, usr.height, usr.weight, usr.allergy, usr.basal, name]
          }
          PythonShell.run('test.py', options, function (err, codes) {
            if (err) console.log(err);
            console.log("codes = "+codes);
            
            var result = [];
            codes.forEach(function (element, index, array) {
              Foods.findOne({fd_Code:element},(err, x) => {
                result.push({'lr_ctg':x.upper_Fd_Grupp_Nm, 'md_ctg':x.fd_Grupp_Nm_list, 'sm_ctg':x.fd_Nm});
                console.log(x.fd_Nm);
                if (array.length == result.length) {
                  res.status(200).json({
                    code: 200,
                    msg:'로그인 성공',
                    data:result
                  });
                  console.log("로그인 성공");
                }
              });
              
            })
           });
        });
      }
      else{
        console.log('로그인 실패..\n');
        res.status(400).json({
          msg: '로그인 실패'
      });
      }
      // + 실패 이유
  });
});


//const pbkdf2Password = require("pbkdf2-password");
//var hasher = pbkdf2Password();

// 회원 가입 - 추가 : pw 암호화 전달
userRouter.post('/signup', async function(req,res){
  var new_user = new Users(req.body);
  console.log(new_user);

  // + 회원가입 조건 확인
  
	new_user.save((err) => {
		if (err) return res.json({ code:500, msg: '회원가입 실패' });
		else return res.json({ code:200, msg: '회원가입 성공', userId : new_user.id});
    console.log("회원가입 성공");
	});
  console.log("new name = "+new_user.name);
});

const { Op } = require("sequelize");
// 중복 id 확인
userRouter.post('/signin', (req, res) => {
  console.log("중복 확인 Id = "+req.body.userId);
  
	Users.findOne({ userId: req.body.userId}, (err, user) => {
		if (err) {
      return res.status(500).json({ msg: '서버 에러!' });
    }
		else if (user) {
      return res.json({ code:400, msg: '사용중인 id', data: user });
      console.log("사용 불가 id");
    }
		else {
      return res.json({ code:200, msg: '사용 가능 id' });
      console.log("사용 가능 id");
    }
	});
});


// 내정보 /users/info -> userid
userRouter.get('/info',function(req, res) {
  Users.findOne({ userId: req.body.userId},
    (err,user) => {
      if (err) {
        res.send('server error');
      }
      else if (user) {
        const result = {
            code: 200,
            msg: '회원정보 전송 성공',
            userId: user.userId,
            name : user.name,
            sex : user.sex,
            height : user.height,
            weight : user.weight,
            age : user.age,
            allergy : user.allergy,
            basal : user.basal
        };
        res.send(result);
      }
      else{
          const f_result = {
              code: 400,
              msg: '회원정보 전송 실패'
          };
          res.send(f_result);
      }
    });
  });


/*
// 설문조사 - /users/survey
userRouter.post('/survey', async function(req,res){
  // id 받아서 추가 후 알러지 정보 넘기기
  Users.findOne({ userId: req.body.userId },
    (err,user) => {
      if (err) res.json({ code:500, msg: '설문 서버 오류' });
      else if (user) {
        user.weight = req.body.weight;
        user.height = req.body.height;
        user.sex = req.body.sex;
        user.age = req.body.age;
        user.allergy = req.body.allergy;

        res.json({ code:200, msg: '설문 성공!', userId : user.id, userAllergy: user.allergy, data: user});

        console.log('설문 성공!\n');
        console.log("userId ="+user.id);
        console.log("data = "+user);
      }
      else{
        res.json({ code:400, msg: '설문 실패..', userId : user.id});
        console.log('설문조사 실패..\n');
        // 실패 이유가 id, pw 중 어떤 문제인지 출력 필요?
        // if) 해당 id 존재 여부 확인 -> 비밀번호 확인 
      }
  });
});
*/



// url : members/(id) + json-{"password":"(pw)",변경정보} 
// req.params="id" & req.params.id=123 

/*
// 회원 수정 - 로그인된 경우만 진입할 수 있게 
userRouter.post('/:id',function(req, res, next){
  Users.findOne({ userId: req.req.userId, userPassword: req.body.userPassword },
    (err,user) => {
      if (err) {
        res.send('수정 서버 오류');
      }
      else if (user) {
        user.userPassword = req.body.userPassword;
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
*/

module.exports = userRouter;
