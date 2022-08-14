var Client = require('mongodb').MongoClient;
const User = require('../../app/server/models/user');

Client.connect('mongodb://127.0.0.1:27017',
function(error, client){
    if(error) {
        console.log(error);
    } else {
        var db = client.db("newMenu");
        // 1. 읽어올 document 필드값 정의
        var query = {id:'id'};
        // 2. find( ) 함수에 query 입력
        var cursor = db.collection('users').find(query);
        cursor.each(function(err,doc){
            if(err){
                console.log(err);
            }else{
                if(doc != null){
                    console.log(doc);
                }
            }
        });
        client.close();
    }
});

/* 1개 데이터 저장
Client.connect('mongodb://127.0.0.1:27017',
function(error, client){
    if(error) {
        console.log(error);
    } else {
        var db = client.db("newMenu");
        // 2. student 컬렉션의 insert( ) 함수에 입력
        db.collection('users').insertOne({
            name: "test1",
            id: "id1",
            password: "pw",
            email: "32203660@dankook.ac.kr"
        },
        function(err, res) {
            if (err) console.log(err);
            console.log("insert");
            client.close();
        })
    }
});
*/


/*
// 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');
// 2. testDB 세팅
mongoose.connect('mongodb://127.0.0.1:27017/newMenu');
// 3. 연결된 testDB 사용
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('DB Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('DB Connected!');
});

var users = mongoose.Schema({
    userId : 'string',
    userPassword : 'string',
    name : 'string',
    //age : 'number',
    height : 'number',
    weight : 'number',
    allergy : 'string',
});

// 7. 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
var User = mongoose.model('Schema', users);
*/
/*
// 8. User 객체를 new 로 생성해서 값을 입력
var newUser = new User({userId:"id1", userPassword:"pw", name:"test", height:160, weight:60, allergy:null});


// 9. 데이터 저장
newUser.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log('Saved!')
    }
});

// 10. User 레퍼런스 전체 데이터 가져오기
User.find(function(error, users){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(users);
    }
})

// 11. 특정 아이디값 가져오기
User.findOne({_id:'62f5db87f0bf69fd1225f15a'}, function(error,User){
    console.log('--- Read one ---');
    if(error){
        console.log(error);
    }else{
        console.log(User);
    }
});

// 12. 특정아이디 수정하기
User.findById({_id:'62f5db87f0bf69fd1225f15a'}, function(error,User){
    console.log('--- Update(PUT) ---');
    if(error){
        console.log(error);
    }else{
        User.allergy = 'modified'; // 수정
        User.save(function(error,modified_User){
            if(error){
                console.log(error);
            }else{
                console.log(modified_User);
            }
        });
    }
});

// 13. 삭제
User.deleteOne({_id:'62f5db87f0bf69fd1225f15a'}, function(error,output){
    console.log('--- Delete ---');
    if(error){
        console.log(error);
    }
    console.log('--- deleted ---');
});
*/

var Client = require('mongodb').MongoClient;

Client.connect('mongodb://localhost:27017/foods', function(error, db){
    if(error) {
        console.log(error);
    } else {
        /*
        var foods = db.collection('foods').find();
        foods.each(function(err, doc){ 
            if(err) {
                console.log(err);
            } else {
                if(doc != null){
                    console.log(doc);
                }
            }
        });
        */
       
        var food = {foodId:2, name:"kimchi"};
        db.collection('foods').insert(food);
        // 여러 값
        // db.collection('foods').insertMany([jordan,amanda]);
        db.close();
    }
});