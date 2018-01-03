/**
 * @file Looking for the user in the db
 * @author S Susan
 */

let express = require('express');
let router = express.Router();
let user = require('./../server/models/user');

router.post('/', function(req, res, next) {
    //Todo:
    //1: Get username from request
    let userRole = "";
    let userName = req.body.userName;
    if(req.body.bidder){
        userRole = "bidder";
    }else {
        userRole = "supplier";
    }
    console.log(userRole);
    console.log("User name: ", userName);
    console.log('User db:', user);
    //2: Get product details from db by using id
    user.findOne({firstName: userName} ).exec(function(err, user) {
        if (err) {
            console.log('Error while getting a user from DB');
        } else {
            console.log('User fetched:', user);
            //3: Check if the user exists
            if (!user) {
                console.log('User is not there');
                res.send({result: "f", message : "User does not exist"});
            }
            else {
                //4: Check if product is already removed
                if (user.userRole !== userRole){
                    console.log('User is not a ', userRole);
                    res.send({result: "f", message : 'User is not a '+userRole});
                }
                else {
                    if (user.isDeleted === true) {
                        console.log('User is already deleted');
                        res.send({result: "f", message: 'User is already deleted'});
                    }

                    else {
                        console.log('User is exists');
                        //4: Pass product to view (userProfile.pug)
                        res.send({result: "t", message: "User is exist", UserName: user.firstName, Id: user._id});
                    }
                }
            }
        };
    });
});

module.exports = router;