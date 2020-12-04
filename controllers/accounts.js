'use strict'
const logincollection = require('../models/login-collection');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {
  
  index(request, response){
    const viewData = {
      title: 'login or Signup',
    };
    response.render('index', viewData);
  },
  
  login(request, response){
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  
  logout(request, response){
    response.cookie('videxlist', '');
    response.redirect('/');
  },
  
  signup(request, response){
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  
  register(request, response){
    const login = request.body;
    login.id = uuid();
    logincollection.addLogin(login);
    logger.info(`registering ${login.email}`);
    response.redirect('/login');
  },
  
  authenticate(request, response){
    const login = logincollection.getLoginByEmail(request.body.email);
    if(login && login.password === request.body.password){
      response.cookie('videxlist', login.email);
      logger.info(`logging in ${login.email}`);
      response.redirect('/start');
    }else{
      response.redirect('/login');
    }
  },
  
  getCurrentLogin(request){
    const loginEmail = request.cookies.videxlist;
    return logincollection.getLoginByEmail(loginEmail);
  }
}

module.exports = accounts;