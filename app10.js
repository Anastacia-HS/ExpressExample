// Express 기본 모듈 불러오기
var express = require('express'), http = require('http'), path = require('path');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// app.use('/public' 추가)
app.use('/public', static(path.join(__dirname, 'public')));

//라우터 객체 잠조
var router = express.Router();

// 라우팅 함수 등록
router.route('/process/users/:id').post(function(req, res) {
  console.log('/process/users/:id 처리함');
  
  // URL 파라미터 확인
  var paramId = req.params.id;
  console.log('/process/users와 토큰 %s를 이용해 처리함.', paramId);

  var paramName = req.body.name || req.query.name;
  var paramPassword = req.body.password || req.query.password;
  res.writeHead('200', {'Content-Type' : 'text/html; charset=utf-8'});
  res.wirte('<h1>Express 서버에서 응답한 결과입니다. </h1>');
  res.write('<div><p>Param name : ' + paramName + '</p>,/div>');
  res.write('<div><p>Param id : ' + paramId + '</p></div>');
  res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
  res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
  res.end();
});

//라우터 객체를 app 객체에 등록
app.use('/', router);

// 등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function(req, res) {
  res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
  console.log('익스프레스 서버를 시작했습니다. : ' + app.get('port'));
});
