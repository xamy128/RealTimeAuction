/**
 * @file Register logic for user
 * @author A. Kaul
 */

let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');



router.post('/', function(req, res, next) {
    
// Save user profile into the DB function
    let saveUser = function(newUser){
        newUser.save((err, updatedDocs) => {
            if(err)
                throw err;
             else
             req.session.userId  = updatedDocs._id;
             req.session.userRole = updatedDocs.userRole;

            res.render(path.join(__dirname,'./../views/userProfile.pug'), { 
                firstName: updatedDocs.firstName,
                lastName: updatedDocs.lastName,
                email: updatedDocs.email ,
                userRole: updatedDocs.userRole,
            });
        });
    }
    
// Validation to see if the user already exists
    if((req.body.first_name && req.body.last_name && req.body.email && req.body.password && req.body.password_confirmation) &&(req.body.password === req.body.password_confirmation)){
        
        let newUser = new user();
        newUser.userName = req.body.email;
        newUser.firstName = req.body.first_name;
        newUser.lastName = req.body.last_name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.userRole = req.body.user_role;
        newUser.isDeleted = false;
        
// Save user profile into the DB if user does not exist and 
        user.findOne({'email': req.body.email, 'isDeleted': false}, (err,docs) => {
            if(err){
                throw err;
            }if(docs){
                res.render(path.join(__dirname,'./../views/register.pug'),{
                    message: 'Profile already exists'
                });
                // res.redirect('/?msg=Profile already exists');
            }else{
                saveUser(newUser);
            }
                
        })        
    } else{
        res.render(path.join(__dirname,'./../views/register.pug'), {
            message: 'Password confirmation does not match'
        });
    }
    
});

module.exports = router;
