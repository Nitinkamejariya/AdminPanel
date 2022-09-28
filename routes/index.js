const express = require('express');

const routes = express.Router();

const passport = require('passport');

const AdminController = require('../controllers/AdminController');


routes.get('/',AdminController.A_login);

routes.get('/Adminlogout',AdminController.Adminlogout);

routes.get('/Dash',passport.checkAuthentication,AdminController.Dashboard);

routes.get('/AddAdmin',passport.checkAuthentication,AdminController.AddAdmin);

routes.post('/AdminInsert',passport.checkAuthentication,AdminController.AdminInsert);

routes.get('/ViewAdmin',passport.checkAuthentication,AdminController.ViewAdmin);

routes.get('/updateAdmin',passport.checkAuthentication,AdminController.updateAdmin);

routes.post('/EditAdmin',passport.checkAuthentication,AdminController.EditAdmin);

routes.get('/removeAdmin',passport.checkAuthentication,AdminController.removeAdmin);

routes.post('/LoginData',passport.authenticate('local',{failureRedirect : '/'}),AdminController.LoginData);

routes.get('/AdminProfile',passport.checkAuthentication,AdminController.AdminProfile);

routes.get('/ChangePassword',passport.checkAuthentication,AdminController.ChangePassword);

routes.post('/ResetPassword',AdminController.ResetPassword);

routes.get('/AdminResetPassword',AdminController.AdminResetPassword);

routes.post('/LostPassword',AdminController.LostPassword);

routes.get('/EnterOTP',AdminController.EnterOTP);

routes.post('/verifyotp',AdminController.verifyotp);

routes.get('/GenerateNewPassword',AdminController.GenerateNewPassword);

routes.post('/ResetNewpassword',AdminController.ResetNewpassword);

routes.get('/download',AdminController.GeneratePdf);

routes.get('/GoogleLogin',passport.authenticate('google',{scope : ['profile','email']}));

routes.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/'}),AdminController.GoogleLogin);

routes.use('/Book',require('./Book'));

routes.use('/category',require('./Category'));



module.exports = routes;