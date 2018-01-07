
/**
 * @file Goto the details of the user if he/she exists
 * @author S Susan
 */

let express = require('express');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

router.get('/', function(req, res, next) {
    let id  = req.query.id;
    console.log('User id ', id);
    user.findOne({_id: id} ).exec(function(err, user) {
        if (err) {
            console.log('Error while getting a product from DB');
        } else {
            res.render(path.join(__dirname, './../views/userProfile.pug'), {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userRole: user.userRole,
            });
        }
    })
});

module.exports = router;