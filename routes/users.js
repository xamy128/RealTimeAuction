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
    user.findOne({'_id': req.session.userId}, (err,docs) => {
        if(err){
            throw err;
        }if(docs){
//If user role is admin he should be able to change email and role
            if(req.session.userRole.toUpperCase() === "ADMIN"){
                res.render(path.join(__dirname,'./../views/editUserAdmin.pug'), { 
                    firstName: docs.firstName,
                    lastName: docs.lastName,
                    email: docs.email,
                    userRole: docs.userRole,
                });

            }
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
