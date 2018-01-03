/**
 * @file Delete the selected user from the db
 * @author S Susan
 */

let express = require('express');
let router = express.Router();
let user = require('./../server/models/user');

router.post('/', function(req, res, next) {
    //Todo:
    //1: Get id from request
    let email = req.body.email;
    console.log("User email: ", email);
    //2: Delete product details from db by using id
    user.update({email: req.body.email}, {isDeleted:true}, function(err, row){
        if (err) {
            console.log('Error while deleting a user from DB');
        } else {
            console.log('User is deleted');
            //3: Return to main page
            res.render('admin', {title: 'Welcome admin'});
            //})
        };}
    )
});

module.exports = router;