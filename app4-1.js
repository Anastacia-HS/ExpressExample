// 실습 1 : X
// JSON객체
// var person = {name : '소녀시대', age : 20};
// res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'});
// res.end(person);

// 실습 2 : O
// var person = {name : '소녀시대', age : 20};
// var personStr = JSON.stringify(person);
// res.writeHead('200', {'Content-Type' : 'application/json; charset=utf8'});
// res.end(personStr);

// 실습 3 : X
// var person = {name : '소녀시대', age : 20};
// var personStr = JSOM.stringify(person);
// res.end(personStr);

// 실습 4 : O
// 데이터는 HTML 문자열
// var person = {name : '소녀시대', age : 20};
// var personStr = JSON.stringify(person);
// res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'});
// res.end(personStr);

// 실습 5 : O
// var person = {name : '소녀시대', age : 20};
// var personSTr = JSON.stringify(person);
// res.send(personStr);

// 실습 6 : O
// var person = {name : '소녀시대', age : 20};
// res.end(person);

// 실습 7 : O
// req.user = "Anastasia";
// res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'});
// res.end('<h1>Express 서버에서 ' + req.user + '를 res, writeHead와 end로 응답한 결과입니다.</h1>');

// 실습 8 : O
// req.user = 'Anastasia';
// res.send('<h1>Express 서버에서 ' + req.user + '를 send로 응답한 결과입니다.</h1>');