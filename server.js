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
let wrong = require('./routes/wrong');

let dbConfig = require('./config/db');
mongoose.connect(dbConfig.url);

let app = express();

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

app.use('/', register);
app.use('/users', users);
app.use('/signup', signup);
app.use('/modify', modify);
app.use('/delete', del);
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

app.listen(port, () =>  console.log(`Server is running on port ${port}`));

module.exports = app;

// let express = require('express'),
//  bodyParser = require('body-parser'),
//  path = require ('path'),
//  cookieParser = require('cookie-parser'),
//  session = require('express-session'),
//  routes = require('./routes/routes.js'),
//  passport = require('passport');
//  passportNew = require('./config/passport.js')(passport),
//  socket = require('socket.io');

//  let userController = require('./server/controller/userController.js'),
//  user = require('./server/models/user.js'),
//  facebookStrategy = require('passport-facebook').Strategy,
//  // http= require('http'),
//  // socketIO = require ('socket.io')
//  app = express();

// //  let server = app.listen(3000);
// //  app.use(express.static('app'))
// //  let io = socket(server);

//  //server.listen(3000)


// //mongoose.connect(dbConnection.url);
// //userController.SaveUserData();

// //  app.use(cookieParser());
// //  app.use(session({secret: 'realTimeAuction',
// // saveUninitialized: true,
// // resave: true
// // }));
// app.use(passport.initialize());

// app.engine('pug', require('pug').__express)
// // view engine setup
// app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'pug');

// app.use(bodyParser.json());
// //app.use(routes(app));

// app.use(bodyParser.urlencoded({extended : false}));

// app.use(express.static(path.join(__dirname, 'app')));
// app.use(express.static('node-modules'));

// // app.use('/', routes);
// // app.use('/api', apiRoutes);

// // let port = process.env.PORT || 3000;

// //  app.get('/',(req,res,err) => {
// //     res.send('We are UP');
// //     console.log(req.cookies);
// //     console.log('===========');
// //     console.log(req.session);
// // })
// // io.sockets.on('connection', newConnection);
// // function newConnection(client) {
// //     console.log(client.id);

// //     client.on('mouse', mouseMsg);

// //     function mouseMsg(data) {
// //         console.log(data);
// //     };
// // };
// // io.on('connection', (client) => {
// //     console.log('Server pe aaya');

// //     client.on('test', (event) => {
// //         console.log('I arrived', event);
// //         console.log(event.my, event);
// //     });
// // })

// // require('./routes/routes.js')(app);
// let server = require('http').Server(app);
// let io = require('socket.io')(server); 

// server.listen(3000);

//  app.get('/', (req, res) => {
//      console.log('Step1');
//      //res.sendFile(path.join(__dirname ,'../app/views/login.html'));
//     res.render('../app/views/login');
//  });
// passport.use(new facebookStrategy({
//     'clientID': '509964202717200',
//     'clientSecret': '8ca769a178490c70d5476070817c622b',
//     'callbackURL': 'http://loclahost:3000/auth/facebook/callback'
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     process.nextTick(function(){
//         console.log(accesToken);
//     //     user.findOne({'facebook.id':  profile.id}, function(err, user){
//     //         if(err)
//     //         return cb(err);
//     //         if(user){
//     //             return cb(null, user);
//     //         }
//     //         else{
//     //             let newUser = new User();
//     //             newUser.facebook.userId = profile.id;
//     //             newUser.facebook.pasword = accessToken;
//     //             newUser.facebook.firstName = profile.name.givenName;
//     //             newUser.facebook.firstName = profile.name.familyName;
//     //             newUser.facebook.email = profile.emails[0].value;

//     //             newUser.Save(function(err){
//     //                 if(err)
//     //                 throw err;
//     //                 return cb(null, newUser);
//     //             })
//     //         }
            
//     //     })
//     // })
//     return cb(null, profile);
//     });
//     }));

// app.use(passport.initialize());

// app.get('/auth/facebook', authenticate);

// function authenticate(){
//     passport.authenticate('facebook');
// };
      
// app.get('/auth/facebook/callback', recieve);

// function recieve(){
//     console.log('Recieving to facebook');
//     passport.authenticate('facebook', { failureRedirect: '/failure' }), function(req, res) {
//         // Successful authentication, redirect home.
//         console.log('Mai yaha hu');
//         res.redirect('/home');
//       }
// }

// app.get('/home', (req, res) => {
//     console.log('Success from facebook');
//          });
// app.get('/failure', (req, res) => {
//     console.log('Failure from facebook');
//          })

// console.log(`Server is running on port 3000`);
//  //app.listen(port, () =>  console.log(`Server is running on port ${port}`));