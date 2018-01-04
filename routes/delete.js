/**
 * @file Delete user profile
 * @author A. Kaul
 */

let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

//Delete user profile
router.post('/', function(req, res, next) {
    user.findOne({'email': req.body.email}, (err,docs) => {
        if(err)
            throw err;
        if(docs){
            docs.isDeleted = true;
 //Set 'IsDeleted' property to true
            docs.save((err, updatedDocs) => {
                if(err)
                    throw err;
                if(updatedDocs){
                    if(req.session.userRole === "admin"){
                        res.render(path.join(__dirname,'./../views/admin.pug'));
                    }
                    else {
                        res.redirect('/');
                    }
                }

            })
        }           
        else
            res.redirect('/*')
    });
});

module.exports = router;
