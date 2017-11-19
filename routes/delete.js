let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

/* POST users listing. */
router.post('/', function(req, res, next) {
    user.update({'local.email': req.body.email}, (err,docs) => {
        if(err)
            throw err;
    });
    res.render(path.join(__dirname,'./../views/register.pug'), { title: 'Real Time Auction' });
});

module.exports = router;
