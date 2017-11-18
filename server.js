let express = require('express'),
 bodyParser = require('body-parser'),
 path = require ('path'),
 cookieParser = require('cookie-parser'),
 session = require('express-session'),
 routes = require('./routes/routes.js'),
 passport = require('passport');
 passportNew = require('./config/passport.js')(passport),
 app = express();

 let server = require('http').Server(app);
 let io = require('socket.io')(server);

 server.listen(3000)


//mongoose.connect(dbConnection.url);
//userController.SaveUserData();

 app.use(cookieParser());
 app.use(session({secret: 'realTimeAuction',
saveUninitialized: true,
resave: true
}));

app.engine('pug', require('pug').__express)
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
//app.use(routes(app));

app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static('node-modules'));

// app.use('/', routes);
// app.use('/api', apiRoutes);

// let port = process.env.PORT || 3000;

//  app.get('/',(req,res,err) => {
//     res.send('We are UP');
//     console.log(req.cookies);
//     console.log('===========');
//     console.log(req.session);
// })
io.on('connection', (socket) => {
    console.log('Server pe aaya');
    socket.emit('news', {hello: 'world'});
    socket.on('test', (data) => {
        console.log('I arrived');
        console.log(data.my);
    })

    socket.on('test', (data) => {
        console.log('I arrived');
        console.log(data.my);
    })
})

require('./routes/routes.js')(app);

server.listen(3000, () =>  console.log(`Server is running on port 3000`))
 //app.listen(port, () =>  console.log(`Server is running on port ${port}`));