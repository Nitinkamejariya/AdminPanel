const express = require('express');
const passport = require('passport');

const routes = express.Router();

const Bookcontroller = require('../controllers/Bookcontroller');

routes.get('/',passport.checkAuthentication,Bookcontroller.BookPage);

routes.post('/BookAdd',passport.checkAuthentication,Bookcontroller.BookAdd);

routes.get('/ViewBook',passport.checkAuthentication,Bookcontroller.ViewBook);

routes.get('/updateBook',passport.checkAuthentication,Bookcontroller.updateBook);

routes.post('/EditBook',passport.checkAuthentication,Bookcontroller.EditBook);

routes.get('/removeBook',passport.checkAuthentication,Bookcontroller.removeBook);


module.exports = routes;