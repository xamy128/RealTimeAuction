/**
 * @fileSignup page
 * @author A. Kaul
 */

let express = require('express');
let router = express.Router();
let path = require('path');

// GET signup page 
router.post('/', function(req, res, next) {
  res.render(path.join(__dirname,'./../views/register.pug'), { 
    title: 'Real Time Auction',
    msg: req.query.msg ||'Welcome'
   });
});

 module.exports = router;
