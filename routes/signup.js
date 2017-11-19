let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

/* POST users listing. */
router.post('/', function(req, res, next) {
    if(req.body.first_name && req.body.last_name && req.body.email && req.body.password && req.body.password_confirmation){
        let newUser = new user();
        newUser.local.userName = req.body.email;
        newUser.local.firstName = req.body.first_name;
        newUser.local.lastName = req.body.last_name;
        newUser.local.email = req.body.email;
        newUser.local.password = req.body.password;
    
        newUser.save((err) => {
            if(err)
                throw err;
            else
            res.render(path.join(__dirname,'./../views/userProfile.pug'), { 
                firstName: req.body.first_name || 'Ashish',
                lastName: req.body.last_name || 'Kaul',
                email: req.body.email || 'a@a.com',
                userRole: req.body.user_role || 'Batman',
            });
        });
    } else{
        res.render(path.join(__dirname,'./../views/index.pug'));
    }
    
});

module.exports = router;
