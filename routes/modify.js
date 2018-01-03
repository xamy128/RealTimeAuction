/**
 * @file Edit user profile
 * @author A. Kaul
 */

let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

/* Find user profile */
router.post('/', function(req, res, next) {
    user.findOne({'email': req.body.email}, (err,docs) => {
        if(err){
            throw err;
        }if(docs){
            docs.firstName = req.body.first_name;
            docs.lastName = req.body.last_name;
            docs.email = req.body.email;
            docs.userRole = req.body.user_role;
            /* Add edited details from profile into the DB */
            docs.save((err, updatedDocs) => {
                if(err)
                    throw err;
                if(updatedDocs){
                    res.render(path.join(__dirname,'./../views/userProfile.pug'), { 
                        firstName: docs.firstName,
                        lastName: docs.lastName,
                        email: docs.email,
                        userRole: docs.userRole,
                    });
                }else
                    res.redirect('/*');
            })            
        }else{
            res.redirect('/*');
        }
    });
    
});

module.exports = router;
