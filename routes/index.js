var express = require('express');
var router = express.Router();
var user = require('./../server/models/user');
var path = require('path');
var bodyParser = require('body-parser');
var service =require('./../config/db');
//var session = require('client-sessions')



/* GET home page. */
var sess;
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
        if (!user){
            console.log('User is not there');
            res.render('popup', {title: 'User does not exist'});
        }
        if (user) {
            if (user.userRole === 'admin') {
                console.log('admin');
                res.render('admin');
            }


            else {
                console.log('not admin');
                res.render('dashboard');

            }

        }

        //res.render('index', { title: 'Welcome '+ user.UserName });
        else {
            res.render('signup');
        }

    });
});

module.exports = router;

