const express = require('express'),
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
    deleteproduct = require('./routes/adminDeleteProduct'),
    userprofile =require('./routes/adminUserProfile'),
    deleteuser = require('./routes/adminDeleteUser'),
    wrong = require('./routes/wrong'),
    dashboard = require('./routes/dashboard'),
    dbConfig = require('./config/db');
let port = process.env.PORT || 3000;


const app = express();
const sessionOptions = {
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

//routes which don't need login !!!order of lines of codes here is important!!
app.use('/',home);
app.use('/Login',login);

//global setting of isLoggedin and isSupplier !!!order of lines of codes here is important!!
app.use(function(req, res, next){
    const userId=req.session.userId;
    const userRole=req.session.userRole;

    const isLoggedin= !!userId; //true //=>for test
    const isSupplier= userRole !=='bidder';

    // redirect to login page if it's not logged in
    if (!isLoggedin){
        res.redirect('/');
        return;
    }
    res.locals.IsSupplier= isSupplier;
    res.locals.IsLoggedin = isLoggedin;
    next();
});

//routes which need login
app.use('/dashboard', dashboard);
app.use('/register',register);
app.use('/users', users);
app.use('/signup', signup);
app.use('/modify', modify);
app.use('/delete', del);
app.use('/logout', logout);
app.use('/GoToDetails',productdetails);
app.use('/GoToUserDetails',userdetails);
app.use('/searchProduct',searchproduct);
app.use('/DeleteProduct',deleteproduct);
app.use('/userProfile',userprofile);
app.use('/DeleteUser',deleteuser);
app.use('/*', wrong);
//app.use('/admin', admin);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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

app.listen(port);//, () =>  console.log(`Server is running on port ${port}`));

module.exports = app;
