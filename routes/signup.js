let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let user = require('./../server/models/user');


/* POST users listing. */
router.post('/', function(req, res, next) {
    let saveUser = function(newUser){
        newUser.save((err) => {
            if(err)
                throw err;
            else
            res.render(path.join(__dirname,'./../views/userProfile.pug'), { 
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email ,
                userRole: req.body.user_role,
            });
        });
    }
    if((req.body.first_name && req.body.last_name && req.body.email && req.body.password && req.body.password_confirmation) &&(req.body.password === req.body.password_confirmation)){
        
        let newUser = new user();
        newUser.userName = req.body.email;
        newUser.firstName = req.body.first_name;
        newUser.lastName = req.body.last_name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.userRole = req.body.user_role;
        newUser.isDeleted = false;

        console.log(newUser);

        user.findOne({'email': req.body.email, 'isDeleted': false}, (err,docs) => {
            if(err){
                throw err;
            }if(docs){
                if(docs.email === req.body.email){
                     res.redirect('/?msg=Profile already exists');
                }else{
                    saveUser(newUser);
                }
            }else{
                saveUser(newUser);
            }
                
        })        
    } else{
        res.redirect('/?msg=Password confirmation does not match');
    }
    
});

module.exports = router;
