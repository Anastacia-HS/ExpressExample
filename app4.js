// 미들웨어에서 응답 전송할 때 send 메소드 사용하여 JSON 데이터 전송
app.use(function(req, res, next) {
  console.log('첫 번째 미들웨어에서 요청을 처리함.');

  var person = {name : '방탄소년단', age :20};
  res.send(person)

  var personStr = JSON.stringify(person);
  res.send(personStr);

  res.writeHead('200', {'Content-Type' : 'application/json; chrset=utf8'});
  res.write(personStr);
  res.end();
});