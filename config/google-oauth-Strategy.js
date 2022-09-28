const passport = require('passport');
const Admin = require('../models/Admin');

const crypto = require('crypto');


const googleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new googleStrategy({
    clientID : "462713086839-r3chqi04o8rfpmialppsshoo24oo0a52.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:9001/auth/google/callback",
   
},
function(accessToken,refreshToken,profile,cb){
   Admin.findOne({email : profile.emails[0].value }).exec((error,user)=>{
    if(error){
        console.log(error);
        return false;
    }
    if(user){
        return done(null,user);
    }
    else{
        Admin.create({
            name : profile.displayName,
            email : profile.emails[0].value,
            password : crypto.randomBytes(5).toString('hex')
        },(error,user)=>{
            if(error){
                console.log(error);
                return false;
            }
            return done(null,user);
        })
    }
   })
   
    
}
));

module.exports = passport;