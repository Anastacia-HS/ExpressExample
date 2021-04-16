var cookieParser = require('cookie-parser')

// Express 기본 모듈 불러오기
var express = require('express'), http = require('http'), path = require('path');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

router.route('/process/setUserCookie').get(function(req, res) {
  console.log('/process/setUserCookie 호출됨.');

  // 쿠키 설정
  res.cookie('user', {
    id: 'mike',
    name: '소녀시대',
    authorized: true
  });

  // redirect로 응답
  res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req, res) {
  console.log('/process/showCookie 호출됨.');

  res.send(req.cookies);
});

app.use('/', router);

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
  console.log('익스프레스 서버를 시작했습니다. : ' + app.get('port'));
});