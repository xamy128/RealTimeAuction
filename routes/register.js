let express = require('express');
let router = express.Router();
let path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(path.join(__dirname,'./../views/register.pug'), { title: 'Real Time Auction' });
});

 module.exports = router;
