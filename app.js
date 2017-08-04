var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');

var webRouter = require('./routes/web-router');

var app = express();

//设置ejs-mate为模板引擎，并识别html后缀
app.engine('html',engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//设置网页标签页的图标
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRouter);

//处理404错误
app.use(function(req, res, next) {
  var err = new Error('页面不存在');
  err.status = 404;
  next(err);
});

//错误处理
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //以error.html进行渲染
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
