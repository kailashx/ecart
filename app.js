var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var csrf = require('csurf');
var passport = require('passport');
var logger = require('morgan');
var bodyParser = require('body-parser');


// pass the session to the connect sqlite3 module
// allowing it to inherit from session.Store
var SQLiteStore = require('connect-sqlite3')(session);

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
//var usersRouter = require('./routes/users');
//var loginRouter = require('./routes/login');
//var signupRouter = require('./routes/signup');
//var sellerSingup = require('./routes/seller-signup');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'in andaman nicober',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: 'var/db' })
}));
app.use(csrf());
app.use(passport.authenticate('session'));
app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});
app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
//app.use('/users', usersRouter);
//app.use('/login', loginRouter);
//app.use('/signup', signupRouter);
//app.use('/seller-signup', sellerSingup);


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


//handling request
//app.get('/login', function(req, res, next) {
//  res.render('login');
//});

module.exports = app;
