// 첫 번째 미들웨어에서 다음 미들웨어로 넘김
app.use(function(req, res, next) {
  console.log('첫번째 미들웨어에서 요청을 처리함.');

  req.user = 'Anastasia';

  next();
});

// 두 번째 미들웨어에서 응답 전송
app.use('/', function(req, res, next) {
  console.log('두 번째 미들웨에서 요청을 처리함.');

  res.writeHead('200', {'Context-Type' : 'text/html; charset=utf-8'});
  res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과입니다.</h1>');
});