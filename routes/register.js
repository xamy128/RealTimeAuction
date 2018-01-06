/**
 * @fileSignup page
 * @author A. Kaul
 */

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let path = require('path');

// GET signup page 
router.get('/', function(req, res, next) {
  res.render(path.join(__dirname,'./../views/register.pug'));
});

module.exports = router;
