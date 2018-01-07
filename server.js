let express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    home = require('./routes/Home'),
    login = require('./routes/Login'),
    register = require('./routes/register'),
    users = require('./routes/users'),
    signup = require('./routes/signup'),
    modify = require('./routes/modify'),
    del = require('./routes/delete'),
    logout = require('./routes/logout'),
    //admin = require('./routes/admin'),
    productdetails = require('./routes/adminProductDetails'),
    userdetails = require('./routes/adminUserDetails'),
    searchproduct = require('./routes/adminSerachProduct'),
    userprofile =require('./routes/adminUserProfile'),
    wrong = require('./routes/wrong'),


    dbConfig = require('./config/db');
let port = process.env.PORT || 3000;

let app = express();

app.use(express.static(path.join(__dirname, 'public')));

//To Create a session
let sessionOptions = {
    secret: "secret",
    resave : true,
    saveUninitialized : false,
};

app.use(session(sessionOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
mongoose.connect(dbConfig.url);
app.use('/',home);
app.use('/Login',login);
app.use('/register',register);
app.use('/users', users);
app.use('/signup', signup);
app.use('/modify', modify);
app.use('/delete', del);
app.use('/logout', logout);
app.use('/GoToDetails',productdetails);
app.use('/GoToUserDetails',userdetails);
app.use('/searchProduct',searchproduct);
app.use('/userProfile',userprofile);
app.use('/*', wrong);
//app.use('/admin', admin);

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

app.listen(port);//, () =>  console.log(`Server is running on port ${port}`));

module.exports = app;


