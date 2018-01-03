/**
 * @file Login Page and User Authentication
 * @author Anjali Sasidharan
 */

var express = require('express');
var router = express.Router();
//var user = require('./../server/models/user');
//var service =require('./../config/db');

//Get to Homepage
router.get('/', function(req, res, next) {
    res.render('LoginPage');
});

module.exports = router;
// //Route to Signup Page When Signup button is clicked
// router.post('/signup', function(req, res, next) {
//     res.render('signup');
// });

// //Login Authentication Logic
// router.post('/', function(req, res, next) {
//     // Get data
//     var email = req.body.email;
//     var password = req.body.password;
//     console.log(email);
//     console.log(password);
//     // Check if the user exist
//     user.findOne({email: email, Password: password}).exec(function (err, user) {
//         if (err) {
//             throw err;
//         }
//         //Verify if User is admin, if so Route to admin Page
//         else {
//             if (user.userRole === 'admin') {
//                 req.session.userId  = user._id;
//                 req.session.userRole = user.userRole;
//                 res.render('admin', {title: 'Welcome admin'});
//             }
//             //if User is not Admin Route to Dashboard
//             else {
//                 req.session.userId = user._id;
//                 req.session.userRole = user.userRole;
//                 res.render('dashboard');
//             }
//         }
//         //If User does not Exist alert Invalid User
//         if(!user)
//         {
//             res.render('LoginPage', {title: 'Invalid user please try again'});
//         }
//
//     });
// });
//
// module.exports = router;
