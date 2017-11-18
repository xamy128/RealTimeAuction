let userController = require('../server/controller/userController.js'),
user = require('../server/models/user.js'),
path = require('path'),
// http= require('http'),
// socketIO = require ('socket.io'),
passport = require('passport');

 module.exports = (app) => {

     app.get('/', (req, res) => {
         console.log('Step1');
         //res.sendFile(path.join(__dirname ,'../app/views/login.html'));
        res.render('../app/views/login');
     });

     app.get('/test',(req,res) => {
        console.log('Step2');
     })
    //  app.get('/:username/:password', (req,res) => {
    //             let newUser = new user();
    //             userController.SaveUserData(newUser, req)
                
    //             console.log(newUser.local.username);
    //             console.log(newUser.local.password);
    //             res.send('Success');
    //         });
            
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['emails']}));
          
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failure' }), function(req, res) {
              // Successful authentication, redirect home.
              console.log('Mai yaha hu');
              res.redirect('/home');
            });

    app.get('/home', (req, res) => {
                res.send('Login facebook wala successful');
             });
    app.get('/failure', (req, res) => {
                res.send('Login facebook wala failed Page');
             })
 };