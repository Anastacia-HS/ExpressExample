//Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');

// 익스프레스 객체 생성
var app = express();

// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');

// 익스프레스 객체 생성
var app = express();

// 미들웨어에서 redirect 메소드 사용
app.use(function(req, res, next) {
  console.log('첫 번쩨 미들웨어에서 요청을 처리함.');

  res.redirect('http://google.co.kr');
});