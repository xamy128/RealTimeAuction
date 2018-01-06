/**
 * @file Logout user from the application
 * @author A. Kaul
 */
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

//Delete session object and logout user
router.get('/', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

 module.exports = router;
