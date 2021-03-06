/**
 * @file Login Page and User Authentication
 * @author Anjali Sasidharan
 */
let express = require('express');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

router.post('/', function(req, res, next) {
    // Get data
    let email = req.body.email;
    let password = req.body.password;
    // Check if the user exist
    user.findOne({email: email, password: password}).exec(function (err, user) {
        if (err) {
            throw err;
        }else
        if(user){//Verify if User is admin, if so Route to admin Page
            if(user.isDeleted === true){
                res.render('LoginPage', {title: 'Invalid user please try again'});
            }else{
                req.session.userId  = user._id;
                req.session.userRole = user.userRole;
                req.session.firstName = user.firstName;
                if (user.userRole === 'admin') {
                    const isLoggedin= !!req.session.userId;
                    res.locals.IsLoggedin = isLoggedin;
                    res.render('admin', {title: 'Welcome admin'});
                }
                //if User is not Admin Route to Dashboard
                else {
                    res.redirect('/dashboard')
                }
            }
         }
         else{ //If User does not Exist alert Invalid User
             res.render('LoginPage', {title: 'Invalid User please try again'});
         }

    });
});

module.exports = router;