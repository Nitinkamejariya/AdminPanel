const express = require('express');
const port = 9001;
const path = require('path');
const app  = express();

const db = require('./config/mongoose');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const passportStategy = require('./config/passport-local-strategy');
const googleStrategy = require('./config/google-oauth-Strategy');

const flash = require('connect-flash');
const Flashmessage = require('./config/Flashmesaage');



const expressLayout = require('express-ejs-layouts');
app.use(express.static(path.join(__dirname,'assets')));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
app.use('/docs',express.static(path.join(__dirname,'/docs')));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    name : 'Nitin',
    secret : 'patel',
    saveUninitialized : false,
    resave : false,
    cookie : {maxAge: 1000*60*100}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAutentication);
app.use(flash());
app.use(Flashmessage.setFlash);

app.use(expressLayout);
app.use(cookieparser());

app.set('layout','layouts/masterpage');
app.set('Admin_login',{layout : 'Admin_login'});

app.use('/',require('./routes'));

app.listen(port,(error)=>{
    if(error){
        console.log('Server not running');
    }
    console.log('Server running on port:',port);
});