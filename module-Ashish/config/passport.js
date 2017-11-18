let configAuth = require('./auth.js'),
passport = require('passport'),
facebookStrategy = require('passport-facebook').Strategy,
user = require('../server/models/user.js');

module.exports = (passport) => {
passport.use(new facebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function(){
        user.findOne({'facebook.id':  profile.id}, function(err, user){
            if(err)
            return cb(err);
            if(user){
                return cb(null, user);
            }
            else{
                let newUser = new User();
                newUser.facebook.userId = profile.id;
                newUser.facebook.pasword = accessToken;
                newUser.facebook.firstName = profile.name.givenName;
                newUser.facebook.firstName = profile.name.familyName;
                newUser.facebook.email = profile.emails[0].value;

                newUser.Save(function(err){
                    if(err)
                    throw err;
                    return cb(null, newUser);
                })
            }
            
        })
    })
    }))
};