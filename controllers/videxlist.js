'use strict';

const uuid = require('uuid');
const logger = require('../utils/logger');
const videxlistCollection = require('../models/videxlist-collection');
const accounts = require('./accounts.js');

const videxlist = {
  index(request, response){
    const loggedInLogin = accounts.getCurrentLogin(request);
    const videxlistId = request.params.id;
    logger.debug('Videxlist id = ', videxlistId);
    if(loggedInLogin){
    const viewData = {
      title: 'Videxlist',
      videxlist: videxlistCollection.getVidexlist(videxlistId),
      fullname: loggedInLogin.firstName + ' ' + loggedInLogin.lastName,
    };
    response.render('videxlist', viewData);
      }
    else response.redirect('/');
  },
  
  deletetotal(request, response){
    const videxlistId = request.params.id;
    logger.debug(`Deleteing Total ${videxlistId}`);
    videxlistCollection.removeVidexlist(videxlistId);
    response.redirect('/dashboard/');
  },
  
};

module.exports = videxlist;