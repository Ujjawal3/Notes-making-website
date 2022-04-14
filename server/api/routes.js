const express=require('express');
const route=express.Router();
const controller=require('./controller.js');
const render=require('./render.js');



route.get('/login',render.login);
route.get('/signup',render.signup);
route.get('/',render.home);
route.get('/logout',render.logout);








route.post('/signup',controller.signup);
route.post('/login',controller.login);
route.get('/dashboard',controller.dashboard);
route.get('/notes/:id',controller.data);
route.post('/update/:id',controller.update);
module.exports=route;
