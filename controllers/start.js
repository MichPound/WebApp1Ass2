'use strict';

const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const videxlistCollection = require('../models/videxlist-collection');
const loginCollection = require('../models/login-collection');

const start = {
  index(request, response) {
    const loggedInLogin = accounts.getCurrentLogin(request);
    logger.info('start rendering');
    
    const totalVidex = videxlistCollection.getAllVidexLists();
    const totalLogins = loginCollection.getAllLogins();
    let totalItems = 0;
    let loginItems = 0;
    let lowName = "";
    let loginLowName = "";
    let highName = "";
    let loginHighName = "";
    let lowItems = totalVidex[0].contents.length;
    let highItems = totalVidex[0].contents.length;
    
    let lows = "";
    let highs = "";
    for (let i in totalVidex){
       if(totalVidex[i].loginid === loggedInLogin.id){
      lows = totalVidex[i].contents.length;
      highs = totalVidex[i].contents.length;
        }
      }
    let loginLowItems = lows;
    let loginHighItems = highs;
    let loginVidex = 0;
    
    let totalLoginVidex = "";
    
    
    for (let i in totalVidex){
      totalItems = totalItems + totalVidex[i].contents.length;
    }
    
    for(let i in totalVidex){
       if( lowItems >= totalVidex[i].contents.length){
         lowItems = totalVidex[i].contents.length;
         lowName = totalVidex[i].title;
       }
      }
      
     for(let i in totalVidex){
       if( highItems <= totalVidex[i].contents.length){
         highItems = totalVidex[i].contents.length;
         highName = totalVidex[i].title;
       }
      }
      
       for (let i in totalVidex){
       if(totalVidex[i].loginid === loggedInLogin.id){
       loginItems = loginItems + totalVidex[i].contents.length;
        }
      }
      
    for(let i in totalVidex){
      if(totalVidex[i].loginid === loggedInLogin.id){
       if( loginLowItems >= totalVidex[i].contents.length){
         loginLowItems = totalVidex[i].contents.length;
         loginLowName = totalVidex[i].title;
       }
      }
    }
    
    for(let i in totalVidex){
       if(totalVidex[i].loginid === loggedInLogin.id){
       if( loginHighItems <= totalVidex[i].contents.length){
         loginHighItems = totalVidex[i].contents.length;
         loginHighName = totalVidex[i].title;
       }
       }
      }
    
    for(let i in totalVidex){
       if(totalVidex[i].loginid === loggedInLogin.id){
         loginVidex = loginVidex + 1;
       }
      }
    
     if(loggedInLogin){
    const viewData = {
      title: 'Welcome to Videx',
      logins: loginCollection.getAllLogins(),
      totalVidex: totalVidex.length,
      
      fullname: loggedInLogin.firstName + ' ' + loggedInLogin.lastName,
      avgVidex: Math.round(totalItems/totalVidex.length),
      //all users
      totalItems: totalItems,
      lowName: lowName,
      highName: highName,
      totalUsers: totalLogins.length,
      //individual users
      loginVidex: loginVidex,
      loginAvgVidex: Math.round(loginItems/loginVidex),
      loginItems: loginItems,
      loginLowName: loginLowName,
      loginHighName: loginHighName,
      
      totalLoginVidex: totalLoginVidex
    };
    response.render('start', viewData);
       }
    else response.redirect('/');
  },
};

module.exports = start;
