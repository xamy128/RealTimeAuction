/**
 * @file In case unauthenticated page is encountered
 * @author A. Kaul
 */

let express = require('express');
let router = express.Router();
let path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render(path.join(__dirname,'./../views/wrong.pug'),{url: 'http://localhost:3000'});
});

 module.exports = router;
