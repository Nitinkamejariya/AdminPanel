const express = require('express');
const routes = express.Router();
const passport = require('passport');
const CategoryContoller = require('../controllers/CategoryController');

routes.get('/',passport.checkAuthentication,CategoryContoller.Home);

routes.post('/AddCategory',passport.checkAuthentication,CategoryContoller.AddCategory);

routes.get('/ViewCategory',passport.checkAuthentication,CategoryContoller.ViewCategory);

routes.get('/updateCategory',passport.checkAuthentication,CategoryContoller.updateCategory);

routes.post('/EditCategory',passport.checkAuthentication,CategoryContoller.EditCategory);

routes.get('/removeCategory',passport.checkAuthentication,CategoryContoller.removeCategory);

routes.get('/AddSubCategory',passport.checkAuthentication,CategoryContoller.AddSubCategory);

routes.post('/InsertSubCategory',passport.checkAuthentication,CategoryContoller.InsertSubCategory);

routes.get('/ViewSubcategory',passport.checkAuthentication,CategoryContoller.ViewSubcategory);

routes.get('/updateSubCategory',passport.checkAuthentication,CategoryContoller.updateSubCategory);

routes.post('/EditSubCategory',passport.checkAuthentication,CategoryContoller.EditSubCategory);

routes.get('/removeSubCategory',passport.checkAuthentication,CategoryContoller.removeSubCategory);
module.exports = routes;