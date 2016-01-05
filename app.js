var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var root = require('./routes/root');//设置路由，返回express.Router()对象实例
var nano = require('./routes/nano');//设置路由，返回express.Router()对象实例

var app = express();//返回express对象

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置视图
app.set('view engine', 'jade');//设置视图引擎
app.set('port', process.env.PORT || 80); // 设定监听端口
app.locals.pretty = true;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/imgs/website/logo-icon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//中间件
app.use(function (req, res,next) {
    
    next();
});

app.use('/', root);//设置路由的路径
app.use('/nano', nano);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;
