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
    Password: String,
    userRole: String,
    firstName:String,
    LastName:String
});

// Compile model from schema
var users = mongoose.model('users', UserSchema);


// Create an instance of model SomeModel
var user1 = new users({
    UserName : "bidder@auction.com",
    Password: "bid",
    userRole:"bidder",
    firstName:"bid1",
    LastName:"bid2"
});
//user1.save(function (err) {
// if (err) {
// console.log("Error while inserting user: ", err);
//}
//else
//{
//  console.log("User saved")
//}
// saved!
//});



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/Login', function(req, res, next) {
    //TODO:
    //1: Get data from form objects
    var userName = req.body.userName;
    var password = req.body.password;
    console.log('User Name: ', userName);
    console.log('password: ', password);
    //2: Check if the user exist
    users.findOne({UserName: userName, Password: password}).exec(function (err, user) {
        if (err) {
            console.log('Error while getting a user from DB');
        } else {
            console.log('no error');
            console.log(user);
        }
        //console.log('user ', user);
        if (user) {
            if (user.userRole === 'admin') {
                console.log('admin');
                res.render('admin', {title: 'Welcome ' + user.UserName}); // route to Simil's Page
            }
            else {
                console.log('not admin');
                res.render('index(2)'); // route to Roya's Page
            }
        }

        //res.render('index', { title: 'Welcome '+ user.UserName });
        else {
            alert('user does not exist Please Sign Up');
            //res.render('register'); // // route to Ashish's Page
        }


    });
});

module.exports = router;