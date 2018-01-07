/**
 * @file View user profile logic
 * @author A. Kaul
 */

let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

//Find user profile to edit
router.get('/', function(req, res, next) {
    //user.findOne({'_id': req.session.userId}, (err,docs) => {
    user.findOne({'email': req.query.email}, (err,docs) => {
        if(err){
            throw err;
        }
        console.log('Im here', req.query.email);
        if(docs){
                res.render(path.join(__dirname,'./../views/editUser.pug'), { 
                    firstName: docs.firstName,
                    lastName: docs.lastName,
                    email: docs.email,
                    userRole: docs.userRole,
                });
            
        }else{
            res.redirect('/*');
        }
    });
    
});

module.exports = router;
