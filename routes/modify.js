let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');

/* POST users listing. */
router.post('/', function(req, res, next) {
    res.render(path.join(__dirname,'./../views/editUser.pug'), { 
        firstName: req.body.first_name || 'Ashish',
        lastName: req.body.last_name || 'Kaul',
        email: req.body.email || 'a@a.com',
        userRole: req.body.user_role || 'Batman',
    });
});

module.exports = router;
