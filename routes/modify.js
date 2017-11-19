let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');

/* POST users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body.email);
    user.findOne({'local.email': req.body.email}, (err,docs) => {
        if(err){
            throw err;
        }if(docs){
            res.render(path.join(__dirname,'./../views/editUser.pug'), { 
                firstName: docs.local.first_name,
                lastName: docs.local.last_name,
                email: docs.local.email,
                userRole: docs.local.user_role,
            });
        }else{
            res.redirect('/*');
        }
    });
    
});

module.exports = router;
