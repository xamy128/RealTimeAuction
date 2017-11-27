var express = require('express');
var path = require('path');
//var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    // console.log('I am here!');
    // console.log(path.join(__dirname, '../views'));
    res.sendFile(path.join(__dirname, '../views/page.html'));
    //res.sendFile( 'page.html');
});
//app.use('/', router);
module.exports = router;