var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let dbConfig = require('./config/db');
var vue = require('vue');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var app = express();
var sessionOptions = {
    secret: "secret",
    resave : true,
    saveUninitialized : false,
};
app.use(session(sessionOptions));
mongoose.connect(dbConfig.url);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

const Home = require('./routes/Home');
app.use('/',Home);
const Login = require('./routes/Login');
app.use('/Login',Login);

//global setting of isLoggedin and isSupplier !!!order of lines of codes here is important!!
app.use(function(req, res, next){
    const userId=req.session.userId;
    const userRole=req.session.userRole;

    let isLoggedin= !!userId; //true //=>for test
    let isSupplier= userRole !=='bidder';

    // redirect to login page if it's not logged in
    if (!isLoggedin){
        res.redirect('/');
        return;
    }
    res.locals.IsSupplier= isSupplier;
    res.locals.IsLoggedin = isLoggedin;
    next();
});


app.use('/dashboard', dashboard);
//app.use('/products', productRoute);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
  res.render('error');
});

module.exports = app;
