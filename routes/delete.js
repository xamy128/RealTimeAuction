let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');

/* POST users listing. */
router.post('/', function(req, res, next) {
    res.render(path.join(__dirname,'./../views/index.pug'), { title: 'Real Time Auction' });
});

module.exports = router;
