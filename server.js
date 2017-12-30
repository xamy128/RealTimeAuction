/**
 * @file Server initialization logic
 * @author A. Kaul, F. Rahmati, A. Sasidharan
 */

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let register = require('./routes/register');
let users = require('./routes/users');
let signup = require('./routes/signup');
let modify = require('./routes/modify');
let del = require('./routes/delete');
let logout = require('./routes/logout');
let bidding = require('./routes/bidding');
var dashboard = require('./routes/dashboard');
var index = require('./routes/index');
let wrong = require('./routes/wrong');
let dbConfig = require('./config/db');
mongoose.connect(dbConfig.url);

let app = express();

// var sessionOptions = {
//   secret: "secret",
//   resave : true,
//   saveUninitialized : false,
//   store: new MongoStore({
//       url:"mongodb://admin:admin@ds249005.mlab.com:49005/pm102realtimeauction",
//   })
// };

let server = require('http').createServer(app)
let port = process.env.PORT || 3000;
// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);
app.use('/index', index);
app.use('/users', users);
app.use('/signup', signup);
app.use('/modify', modify);
app.use('/delete', del);
app.use('/logout', logout);
app.use('/dashboard', dashboard);
app.use('/*', wrong);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(path.join(__dirname, './views/error.pug'));
});

bidding(app,server);
server.listen(port, () =>  console.log(`Server is running on port ${port}`));

module.exports = app;
