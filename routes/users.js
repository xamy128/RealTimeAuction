/**
 * @file View user profile logic
 * @author A. Kaul
 */

let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

/* Find user profile to edit */
router.post('/', function(req, res, next) {
    user.findOne({'email': req.body.email}, (err,docs) => {
        if(err){
            throw err;
        }if(docs){
            console.log('User is',req.session.userRole);
            if(req.session.userRole === "admin"){
                res.render(path.join(__dirname,'./../views/editUserAdmin.pug'), { 
                    firstName: docs.firstName,
                    lastName: docs.lastName,
                    email: docs.email,
                    userRole: docs.userRole,
                });

            }else{
                res.render(path.join(__dirname,'./../views/editUser.pug'), { 
                    firstName: docs.firstName,
                    lastName: docs.lastName,
                    email: docs.email,
                    userRole: docs.userRole,
                });
            }
            
        }else{
            res.redirect('/*');
        }
    });
    
});

module.exports = router;
