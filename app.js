const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const passport = require('passport');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession)
const cors = require('cors')
const bodyParser = require("body-parser");

// dotenv.config();
require("./middleware/Passport"); // using passport
require('./middleware/database'); // connect database

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1) // trust first proxy
app.use(logger('dev'));
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.get('/auth/provider', passport.authenticate('local', { successRedirect: '/',
//                                                   failureRedirect: '/login' }));
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

// app.use(cors(corsOption));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api/', require('./Routes/router'));
app.get('/', (req, res) => {
  res.render('index');
});
app.use('/', (req, res) => res.status(404).send("not found api"));
global.base__dirname = __dirname;
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
