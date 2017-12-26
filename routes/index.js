var express = require('express');
var router = express.Router();
var user = require('./../server/models/user');
var path = require('path');
var bodyParser = require('body-parser');
var service =require('./../config/db');



router.get('/', function(req, res, next) {
res.render('index');
});

router.post('/index', function(req, res, next) {
    //TODO:
    //1: Get data from form objects
    var userName = req.body.userName;
    var password = req.body.password;
    console.log('User Name: ', userName);
    console.log('password: ', password);
    //2: Check if the user exist
    user.findOne({UserName: userName, Password: password}).exec(function (err, user) {
        if (err) {
            console.log('Error while getting a user from DB');
        } else {
            console.log('no error');
            console.log(user);
        }
        //console.log('user ', user);

        if(!user)
        {
            res.render('index', {title: 'Invalid user please try again'});
        }
        if (user) {
            if (user.userRole === 'admin') {
                console.log(req.session);
                console.log('admin');
                req.session.userId = user._id;
                res.render('admin', {title: 'Welcome admin'});
            }
            else {
                req.session.userId = user._id;
                console.log(req.session);
                console.log('not admin');
                res.render('dashboard');
            }
        }

        //res.render('index', { title: 'Welcome '+ user.UserName });

    });
});
router.post('/signup', function(req, res, next) {
    res.render('signup', { title: 'please Sign Up Its free' });
});



module.exports = router;
