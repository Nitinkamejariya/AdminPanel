const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const Admin = require('../models/Admin');

passport.use(new passportLocal({
    usernameField : 'email'
},(email,password,done)=>{
    Admin.findOne({email : email},((error,user)=>{
        if(error){
            console.log('email not match');
            return done(null,error);
        }
        if(!user || user.password != password){
            
            console.log('email or password not match');
            return done(null,false);
        }
        return done(null,user);
    }));
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    Admin.findById(id,(error,user)=>{
        if(error){
            console.log('user not found');
            return done(null,false);
        }
        return done(null,user);
    });
});

passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAutentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;