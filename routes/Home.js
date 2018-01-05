/**
 * @file Get to Login Page
 * @author Anjali Sasidharan
 */

let express = require('express');
let router = express.Router();


//Get to Homepage
router.get('/', function(req, res, next) {
    res.render('LoginPage');
});

module.exports = router;

