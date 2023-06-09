var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var TodoRouter = require('./src/routes/todo');

var cors = require('cors');
var app = express();

require('./src/db/connection');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());

app.use(function (req, res, next) {
  res.success = function (message, data, extraData) {
    this.send({
      code: this.statusCode || 200,
      success: true,
      message,
      data,
      extraData
    })
    return this;
  }

  res.error = function (message, errors) {
    this.send({
      code: this.statusCode || 404,
      success: false,
      message,
      errors
    });

    return this;
  }

  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todo', TodoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
