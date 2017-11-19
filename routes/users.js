var express = require('express');
const users = require('../config/usersModel.js');


var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

    users.find({},
        function (err, userList) {
          if (err) return console.error(err);
          //console.log(user.toString());
          res.json(userList);
        });

});


module.exports = router;
