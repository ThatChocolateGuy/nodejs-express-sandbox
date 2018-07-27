var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-hbs');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

//MongoDB Import
const MongoDB = require('./mongo');

// DEFINE ROUTES HERE
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
// var mongoRouter = require('./routes/mongo_client');

var app = express();

// view engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: 'views/layouts/layout.hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: 'max',
  saveUninitialized: false,
  resave: false
}))

// PLACE ROUTES HERE
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
// app.use('/mongo', mongoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;