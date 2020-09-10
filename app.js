var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var passport = require('passport');
var expressSession = require('express-session');
var MemoryStore = require('memorystore')(expressSession)

dotenv.config();

require("./Controllers/Passport");
require('./Model/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1) // trust first proxy

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  secret: process.env.secretKey || "QTData-MarketPlace",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/', require('./Routes/router'));
app.use('/', (req,res)=>res.send("not found api"));
app.use('/test', (req,res)=>res.send("not found api"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
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
