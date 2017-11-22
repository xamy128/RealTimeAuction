var express = require('express');
var router = express.Router();
/*

 */
var mongoose = require('mongoose');
var url = 'mongodb://admin:admin@ds249005.mlab.com:49005/pm102realtimeauction';
//url  = 'mongodb://localhost:27017/RealtimeAuction';
const db = mongoose.connect(url, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
}).connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    UserName : String,
    Password: String
});

// Compile model from schema
var UserModel = mongoose.model('UserModel', UserSchema);


// Create an instance of model SomeModel
var user1 = new UserModel({
    UserName : "kiel",
    Password: "123"
});
// user1.save(function (err) {
//     if (err) {
//       console.log("Error while inserting user: ", err);
//     }
//     else
//     {
//         console.log("User saved")
//     }
//     // saved!
// });







/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/Login', function(req, res, next) {
  //TODO:
    //1: Get data from form objects
    var userName = req.body.userName;
    var password = req.body.password;

    console.log('User Name: ',userName);
    console.log('password: ', password);
    //2: Check if the user exist
    UserModel.findOne({UserName: userName, Password:password}).exec(function(err, user) {
        if (err) {
            console.log('Error while getting a user from DB');
        } else {
            console.log('no error');
            //console.log('user ', user);
            if(user){
               // console.log('user ', user);
                res.render('index', { title: 'Welcome '+ user.UserName });
            }
            else {
                console.log('user not exist ');
            }

            //3: Pass product to view (product.pug)


        }
    });

    usermodel.find({}).exec(function(err, user) {
        if (err) {
            console.log('Error while to SignUp');
        } else {
            console.log('Sign Up for free');
            res.render('signup', {title: 'SignUp page', data: user});
        }
    });


            //3: if user exist login him to index view

    //4: if user does not exist prevent him to login and show him a message
    // res.render('login');
});
module.exports = router;
