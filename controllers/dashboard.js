'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const videxlistCollection = require('../models/videxlist-collection');
const accounts = require('./accounts.js')

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInLogin = accounts.getCurrentLogin(request);
    if(loggedInLogin){
    const viewData = {
      title: 'Videx Playlist Dashboard',
      videxlists: videxlistCollection.getLoginVidexlists(loggedInLogin.id),
      fullname: loggedInLogin.firstName + ' ' + loggedInLogin.lastName,
    };
    logger.info('about to render', videxlistCollection.getAllVidexLists());
    response.render('dashboard', viewData);
      }
    else response.redirect('/');
  },
  
  addVidexlist(request, response){
    const loggedInLogin = accounts.getCurrentLogin(request);
    const newVidexlist = {
      id: uuid(),
      loginid: loggedInLogin.id,
      title: request.body.title,
      photo: request.files.photo,
      contents: [],
    };
    
    videxlistCollection.addVidexlist(newVidexlist, function () { response.redirect('/dashboard')});
  }
};

module.exports = dashboard;