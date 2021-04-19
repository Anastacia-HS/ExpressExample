// Express 기본 모듈 불러오기
var express = require('express'), http = require('http'), path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser'), cookieParser = require('cookie-parser'), static = require('serve-static'), errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기 
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

app.use('/public', static(path.join(__dirname, 'pubilc')));

var expressSession = require('express-session');

// 파일 업로드 용  
var multer = require('multer');
var fs = require('fs');

// 클라이언트에서 ajax로 요청 시 cors(다중 서버 접속) 지원
var cors = require('cors');
const cookieParser = require('cookie-parser');

// public 폴더와 unploads 폴더 오픈
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
  secret:'my key',
  resave:true,
  saveUninitialized:true
}));

// 클라이언트에서 ajax로 요청 시 cors(다중 서버 접속)지원
app.use(cors());

// multer 미들웨어 사용 : 미들웨어 사용 순서 중요 body-parser => multer => router
// 파일 제한 : 10개 1GB
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads')
  },
  filename:function(req, file, callback) {
    var extension = path.extname(file.originalname);
    var basename = path.basename(file.originalname, extension);
    callback(null, basename + Date.now() + extension);
  }
});

var upload = multer({
  storage:storage,
  limits: {
    files:10,
    fileSize: 1024 * 1024 * 1024
  }
});

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

// 파일 업로드 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/photo').post(upload.array('photo1', 1), function(req, res) {
  console.log('/process/photo 호출됨.');

  try {
    var files = req.files;

    console.dir('#===== 업로드 된 첫 번째 파일 정보 =====#')
    console.dir(req.files[0]);
    console.dir('#=====#')

    // 현재의 파일 정보를 저장할 변수 선언
    var originalname = '', filename = '', mimetype = '', size = 0;

    if(Array.isArray(files)) {
      // 배열에 들어간 경우 - 설정에서 1개의 파일도 배열에 넣게 했음
      console.log("배열에 들어있는 파일 개수 : %d", files.length);

      for(var index = 0; index < files.length; index++) {
        originalname = files[index].originalname;
        filename = files[index].filename;
        mimetype = files[index].mimetype;
        size = files[index].size;
      }
    }else {
      // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
      console.log("파일 개수 : 1");

      originalname = files[index].originalname;
      filename = files[index].filename;
      mimetype = files[index].mimetype;
      size = files[index].size;
    }
    console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);

    // 클라이언트에 응답 전송
    res.writeHead('200', {'Content-Tyoe':'text/html; charset=utf8'});
    res.write('<h3>파일 업로드 성공</h3>');
    res.write('</hr>');
    res.write('<p>원본 파일명 : ' + originalname + ' => 저장 파일명 : ' + filename + '</p>');
    res.write('<p>MINE TYPE : ' + mimetype + '</p>');
    res.write('<p>파일 크기 : ' + size + '</p>');
    res.end();
  }catch(err) {
    console.dir(err.stack);
  }// tray-catch-end
}); // router.route('/process/photo')-end

app.use('/', router);