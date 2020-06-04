var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/*  Book code */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book'); // localhost/book

var uuid = require('node-uuid');
//var Client = require('../lib/models/client');
//var AuthCode = require('../lib/models/authcode');

usersRouter.get('/authorize', function(req, res, next) {
  var responseType = req.query.response_type;
  var cliendId = req.query.client_id;
  var redirectUri = req.query.redirect_uri;
  var scope = req.query.scope;
  var state = req.query.state;

  if (!responseType) {
    // cancel the request
  }

  if (responseType !== 'code') {
    // notify unsupported response type
  }

  if(!clientId) {
    // Cancel the request
  }

  Client.findOne({
    clientId: clientId
  }, function(err, client) {
    if (err) {
      // handle the error by passing it to the middleware
      next(err);
    }

    if (!client) {
      // cancel the request client doesn't exist.
    }

    if (redirectUri !== client.redirectUri) {
      // cancel the request
    }

    if (scope !== client.scope) {
      // handle the scope
    }

    var authCode = new AuthCode ({
      cliendId: clientId,
      userId: client.userId,
      redirectUri: redirectUri
    });

    authCode.save();

    var response = {
      state: state,
      code: authCode.code
    };

    if(redirectUrl) {
      var redirect = redirectUrl +
      '?code=' + response.code +
      (state === undefined ? '' : '&state=' + state);
      red.redirect(redirect)
    } else {
      res.json(response);
    }
  });
});
// End book code.

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
