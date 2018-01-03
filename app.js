var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var home = require('./routes/Home'),
    login = require('./routes/Login'),
    dbConfig = require('./config/db');
let port = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
//To Create a session
var sessionOptions = {
    secret: "secret",
    resave : true,
    saveUninitialized : false,
};

app.use(session(sessionOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect(dbConfig.url);

app.use(logger('dev'));
app.use('/', home);
app.use('/Login', login);


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

app.listen(port)

module.exports = app;
