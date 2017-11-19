
let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

/* POST users listing. */
router.post('/', function(req, res, next) {
    user.findOne({'email': req.body.email}, (err,docs) => {
        if(err){
            throw err;
        }if(docs){
            res.render(path.join(__dirname,'./../views/editUser.pug'), { 
                firstName: docs.firstName,
                lastName: docs.lastName,
                email: docs.email,
                userRole: docs.userRole,
            });
        }else{
            res.redirect('/*');
        }
    });
    
});

module.exports = router;
